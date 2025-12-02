import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '@auth/auth.middleware';

const prisma = new PrismaClient();

// Get all event registrations with filtering
export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      memberId,
      status,
      paymentStatus,
      search,
      page = '1',
      limit = '20',
      sortBy = 'registrationDate',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    // Build where clause
    const where: any = {};

    if (eventId) where.eventId = eventId;
    if (memberId) where.memberId = memberId;
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    if (search) {
      where.OR = [
        { ticketNumber: { contains: search as string, mode: 'insensitive' } },
        { notes: { contains: search as string, mode: 'insensitive' } },
        { paymentReference: { contains: search as string, mode: 'insensitive' } },
        { member: { name: { contains: search as string, mode: 'insensitive' } } },
        { member: { email: { contains: search as string, mode: 'insensitive' } } },
        { member: { mobile: { contains: search as string, mode: 'insensitive' } } }
      ];
    }

    const [registrations, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy as string]: sortOrder as 'asc' | 'desc' },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              eventDate: true,
              location: true
            }
          },
          member: {
            select: {
              id: true,
              name: true,
              email: true,
              mobile: true,
              trainingNumber: true,
              district: true,
              trade: true
            }
          }
        }
      }),
      prisma.eventRegistration.count({ where })
    ]);

    res.json({
      registrations,
      total,
      page: parseInt(page as string),
      limit: take,
      totalPages: Math.ceil(total / take)
    });
  } catch (error) {
    console.error('Failed to fetch event registrations:', error);
    res.status(500).json({ error: 'Failed to fetch event registrations' });
  }
};

// Get single registration by ID
export const getRegistrationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registration = await prisma.eventRegistration.findUnique({
      where: { id },
      include: {
        event: true,
        member: true
      }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    console.error('Failed to fetch registration:', error);
    res.status(500).json({ error: 'Failed to fetch registration' });
  }
};

// Create new registration (Admin or Member)
export const createRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, memberId, guests, notes, dietaryRequirements, specialRequests } = req.body;
    const userId = req.user?.id;

    // Validate required fields
    if (!eventId || !memberId) {
      return res.status(400).json({ error: 'Event ID and Member ID are required' });
    }

    // Check if event exists and is published
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status !== 'PUBLISHED') {
      return res.status(400).json({ error: 'Event is not published for registration' });
    }

    // Check if member exists
    const member = await prisma.member.findUnique({
      where: { id: memberId }
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        memberId,
        status: { in: ['PENDING', 'CONFIRMED', 'WAITLISTED'] }
      }
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        error: 'Member already registered for this event',
        registration: existingRegistration
      });
    }

    // Check capacity
    const confirmedRegistrations = await prisma.eventRegistration.count({
      where: { 
        eventId,
        status: 'CONFIRMED'
      }
    });

    let registrationStatus = 'PENDING';
    
    if (confirmedRegistrations >= event.capacity) {
      if (event.waitlistEnabled) {
        registrationStatus = 'WAITLISTED';
      } else {
        return res.status(400).json({ error: 'Event is at full capacity' });
      }
    } else {
      registrationStatus = 'CONFIRMED';
    }

    // Generate ticket number
    const ticketNumber = `T${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        memberId,
        status: registrationStatus,
        ticketNumber,
        guests: guests || 0,
        notes,
        dietaryRequirements,
        specialRequests,
        paymentStatus: event.registrationType === 'FREE' ? 'PAID' : 'NON_PAID',
        paymentAmount: event.registrationType === 'PAID' ? event.price : null
      },
      include: {
        event: true,
        member: true
      }
    });

    // Update event registration count
    if (registrationStatus === 'CONFIRMED') {
      await prisma.event.update({
        where: { id: eventId },
        data: { registeredCount: { increment: 1 } }
      });
    }

    res.status(201).json({
      ...registration,
      message: registrationStatus === 'WAITLISTED' 
        ? 'Added to waitlist due to capacity limit' 
        : 'Registration successful'
    });
  } catch (error) {
    console.error('Failed to create registration:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Duplicate registration detected' });
    }
    res.status(500).json({ error: 'Failed to create registration' });
  }
};

// Update registration status (Admin only)
export const updateRegistrationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, checkInTime, checkOutTime, notes } = req.body;
    const userId = req.user?.id;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const registration = await prisma.eventRegistration.findUnique({
      where: { id },
      include: { event: true }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Handle status changes
    let updateData: any = {
      status,
      paymentStatus,
      notes: notes || registration.notes,
      updatedAt: new Date()
    };

    if (checkInTime) updateData.checkInTime = new Date(checkInTime);
    if (checkOutTime) updateData.checkOutTime = new Date(checkOutTime);

    // If changing from waitlisted to confirmed and there's capacity
    if (registration.status === 'WAITLISTED' && status === 'CONFIRMED') {
      const confirmedCount = await prisma.eventRegistration.count({
        where: { 
          eventId: registration.eventId,
          status: 'CONFIRMED'
        }
      });

      if (confirmedCount >= registration.event.capacity) {
        return res.status(400).json({ error: 'Event is at full capacity' });
      }

      // Update event registration count
      await prisma.event.update({
        where: { id: registration.eventId },
        data: { registeredCount: { increment: 1 } }
      });
    }

    // If changing from confirmed to another status, decrement count
    if (registration.status === 'CONFIRMED' && status !== 'CONFIRMED') {
      await prisma.event.update({
        where: { id: registration.eventId },
        data: { registeredCount: { decrement: 1 } }
      });
    }

    // Update attendance count if checking in
    if (status === 'ATTENDED' && checkInTime && !registration.checkInTime) {
      await prisma.event.update({
        where: { id: registration.eventId },
        data: { attendedCount: { increment: 1 } }
      });
    }

    const updatedRegistration = await prisma.eventRegistration.update({
      where: { id },
      data: updateData,
      include: {
        event: true,
        member: true
      }
    });

    res.json(updatedRegistration);
  } catch (error) {
    console.error('Failed to update registration:', error);
    res.status(500).json({ error: 'Failed to update registration' });
  }
};

// Delete registration (Admin only)
export const deleteRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const registration = await prisma.eventRegistration.findUnique({
      where: { id },
      include: { event: true }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Update event counts if registration was confirmed
    if (registration.status === 'CONFIRMED') {
      await prisma.event.update({
        where: { id: registration.eventId },
        data: { 
          registeredCount: { decrement: 1 },
          ...(registration.checkInTime ? { attendedCount: { decrement: 1 } } : {})
        }
      });
    }

    await prisma.eventRegistration.delete({
      where: { id }
    });

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Failed to delete registration:', error);
    res.status(500).json({ error: 'Failed to delete registration' });
  }
};

// Get event registration statistics
export const getRegistrationStatistics = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const [
      totalRegistrations,
      confirmedRegistrations,
      waitlisted,
      attended,
      pendingPayments,
      totalRevenue
    ] = await Promise.all([
      prisma.eventRegistration.count({ where: { eventId } }),
      prisma.eventRegistration.count({ 
        where: { 
          eventId,
          status: 'CONFIRMED'
        }
      }),
      prisma.eventRegistration.count({ 
        where: { 
          eventId,
          status: 'WAITLISTED'
        }
      }),
      prisma.eventRegistration.count({ 
        where: { 
          eventId,
          status: 'ATTENDED'
        }
      }),
      prisma.eventRegistration.count({ 
        where: { 
          eventId,
          paymentStatus: 'NON_PAID',
          status: { in: ['CONFIRMED', 'WAITLISTED'] }
        }
      }),
      prisma.eventRegistration.aggregate({
        where: { 
          eventId,
          paymentStatus: 'PAID'
        },
        _sum: {
          paymentAmount: true
        }
      })
    ]);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { capacity: true, registrationType: true, price: true }
    });

    const stats = {
      totalRegistrations,
      confirmedRegistrations,
      waitlisted,
      attended,
      pendingPayments,
      totalRevenue: totalRevenue._sum.paymentAmount || 0,
      capacity: event?.capacity || 0,
      remainingCapacity: (event?.capacity || 0) - confirmedRegistrations,
      attendanceRate: totalRegistrations > 0 ? (attended / totalRegistrations) * 100 : 0,
      paidEvent: event?.registrationType === 'PAID',
      ticketPrice: event?.price || 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Failed to get registration statistics:', error);
    res.status(500).json({ error: 'Failed to get registration statistics' });
  }
};

// Bulk update registrations (Admin only)
export const bulkUpdateRegistrations = async (req: AuthRequest, res: Response) => {
  try {
    const { registrationIds, status, paymentStatus } = req.body;
    const userId = req.user?.id;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    if (!registrationIds || !Array.isArray(registrationIds) || registrationIds.length === 0) {
      return res.status(400).json({ error: 'Registration IDs are required' });
    }

    const updatedRegistrations = await prisma.$transaction(
      registrationIds.map(id =>
        prisma.eventRegistration.update({
          where: { id },
          data: {
            ...(status && { status }),
            ...(paymentStatus && { paymentStatus }),
            updatedAt: new Date()
          }
        })
      )
    );

    res.json({
      message: `Successfully updated ${updatedRegistrations.length} registration(s)`,
      updatedRegistrations
    });
  } catch (error) {
    console.error('Failed to bulk update registrations:', error);
    res.status(500).json({ error: 'Failed to bulk update registrations' });
  }
};

// Export registrations to CSV
export const exportRegistrations = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { format = 'csv' } = req.query;

    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId },
      include: {
        event: {
          select: {
            title: true,
            eventDate: true,
            location: true
          }
        },
        member: {
          select: {
            name: true,
            email: true,
            mobile: true,
            trainingNumber: true,
            district: true,
            trade: true
          }
        }
      },
      orderBy: { registrationDate: 'asc' }
    });

    if (format === 'csv') {
      // Convert to CSV
      const headers = [
        'Ticket Number',
        'Member Name',
        'Email',
        'Mobile',
        'Training Number',
        'Trade',
        'District',
        'Registration Date',
        'Status',
        'Payment Status',
        'Payment Amount',
        'Guests',
        'Check-in Time',
        'Check-out Time',
        'Special Requests'
      ];

      const csvRows = registrations.map(reg => [
        reg.ticketNumber || 'N/A',
        reg.member.name,
        reg.member.email || '',
        reg.member.mobile,
        reg.member.trainingNumber,
        reg.member.trade,
        reg.member.district,
        reg.registrationDate.toISOString(),
        reg.status,
        reg.paymentStatus,
        reg.paymentAmount?.toString() || '0',
        reg.guests.toString(),
        reg.checkInTime?.toISOString() || '',
        reg.checkOutTime?.toISOString() || '',
        reg.specialRequests || ''
      ]);

      const csvContent = [
        headers.join(','),
        ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=registrations-${eventId}.csv`);
      res.send(csvContent);
    } else {
      // Return JSON by default
      res.json(registrations);
    }
  } catch (error) {
    console.error('Failed to export registrations:', error);
    res.status(500).json({ error: 'Failed to export registrations' });
  }
};