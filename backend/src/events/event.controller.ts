import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '@auth/auth.middleware';

const prisma = new PrismaClient();

// Get all events with filtering and pagination
export const getEvents = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      status,
      eventType,
      startDate,
      endDate,
      page = '1',
      limit = '10'
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { location: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    if (category) where.category = category;
    if (status) where.status = status;
    if (eventType) where.eventType = eventType;

    if (startDate || endDate) {
      where.eventDate = {};
      if (startDate) where.eventDate.gte = new Date(startDate as string);
      if (endDate) where.eventDate.lte = new Date(endDate as string);
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take,
        orderBy: { eventDate: 'asc' },
        include: {
          _count: {
            select: { registrations: true }
          }
        }
      }),
      prisma.event.count({ where })
    ]);

    res.json({
      events,
      total,
      page: parseInt(page as string),
      limit: take,
      totalPages: Math.ceil(total / take)
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get single event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { registrations: true }
        },
        registrations: {
          include: {
            member: true
          },
          take: 10,
          orderBy: { registrationDate: 'desc' }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Failed to fetch event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create new event
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventData = req.body;
    const userId = req.user?.id || 'system';

    // Validate required fields
    if (!eventData.title || !eventData.eventDate || !eventData.location) {
      return res.status(400).json({ error: 'Title, date, and location are required' });
    }

    const event = await prisma.event.create({
      data: {
        ...eventData,
        createdBy: userId,
        updatedBy: userId,
        // Parse JSON fields if they're strings
        agenda: typeof eventData.agenda === 'string' ? eventData.agenda : JSON.stringify(eventData.agenda),
        speakers: typeof eventData.speakers === 'string' ? eventData.speakers : JSON.stringify(eventData.speakers),
        tags: Array.isArray(eventData.tags) ? eventData.tags : [],
        galleryImages: Array.isArray(eventData.galleryImages) ? eventData.galleryImages : []
      }
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Failed to create event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update event
export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const userId = req.user?.id || 'system';

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        updatedBy: userId,
        updatedAt: new Date(),
        // Handle JSON fields
        agenda: eventData.agenda ? (typeof eventData.agenda === 'string' ? eventData.agenda : JSON.stringify(eventData.agenda)) : undefined,
        speakers: eventData.speakers ? (typeof eventData.speakers === 'string' ? eventData.speakers : JSON.stringify(eventData.speakers)) : undefined,
        // If updating to published status, set publishedAt
        ...(eventData.status === 'PUBLISHED' && existingEvent.status !== 'PUBLISHED' ? { publishedAt: new Date() } : {})
      }
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error('Failed to update event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if event has registrations
    const registrations = await prisma.eventRegistration.count({
      where: { eventId: id }
    });

    if (registrations > 0) {
      return res.status(400).json({
        error: 'Cannot delete event with existing registrations. Cancel the event instead.'
      });
    }

    await prisma.event.delete({
      where: { id }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Failed to delete event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// Publish event
export const publishEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'system';

    const event = await prisma.event.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
        updatedBy: userId
      }
    });

    res.json(event);
  } catch (error) {
    console.error('Failed to publish event:', error);
    res.status(500).json({ error: 'Failed to publish event' });
  }
};

// Cancel event
export const cancelEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user?.id || 'system';

    const event = await prisma.event.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedBy: userId,
        // Store cancellation reason in description
        description: `${existingEvent.description}\n\nCANCELLED: ${reason}`
      }
    });

    // TODO: Send cancellation notifications to registered members

    res.json(event);
  } catch (error) {
    console.error('Failed to cancel event:', error);
    res.status(500).json({ error: 'Failed to cancel event' });
  }
};

// Get event registrations
export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      status,
      paymentStatus,
      search,
      page = '1',
      limit = '20'
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = { eventId: id };

    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    if (search) {
      where.OR = [
        { member: { name: { contains: search as string, mode: 'insensitive' } } },
        { member: { email: { contains: search as string, mode: 'insensitive' } } },
        { ticketNumber: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [registrations, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        where,
        skip,
        take,
        orderBy: { registrationDate: 'desc' },
        include: {
          member: true
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
    console.error('Failed to fetch registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

// Register member for event
export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { memberId, guests, notes, dietaryRequirements } = req.body;

    // Check if event exists and is published
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status !== 'PUBLISHED') {
      return res.status(400).json({ error: 'Event is not published' });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    // Check capacity
    const registrationCount = await prisma.eventRegistration.count({
      where: { eventId, status: { in: ['PENDING', 'CONFIRMED'] } }
    });

    if (registrationCount >= event.capacity) {
      if (event.waitlistEnabled) {
        // Add to waitlist
        const registration = await prisma.eventRegistration.create({
          data: {
            eventId,
            memberId,
            status: 'WAITLISTED',
            guests: guests || 0,
            notes,
            dietaryRequirements
          },
          include: { member: true, event: true }
        });

        return res.status(201).json({
          ...registration,
          message: 'Added to waitlist due to capacity limit'
        });
      } else {
        return res.status(400).json({ error: 'Event is at full capacity' });
      }
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        memberId,
        guests: guests || 0,
        notes,
        dietaryRequirements,
        // Generate ticket number
        ticketNumber: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      },
      include: { member: true, event: true }
    });

    // Update event registration count
    await prisma.event.update({
      where: { id: eventId },
      data: { registeredCount: { increment: 1 } }
    });

    // TODO: Send confirmation email

    res.status(201).json(registration);
  } catch (error) {
    console.error('Failed to register for event:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Member already registered for this event' });
    }
    res.status(500).json({ error: 'Failed to register for event' });
  }
};

// Update registration status
export const updateRegistrationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { registrationId } = req.params;
    const { status, paymentStatus, checkInTime, checkOutTime } = req.body;
    const userId = req.user?.id || 'system';

    const registration = await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: {
        status,
        paymentStatus,
        checkInTime: checkInTime ? new Date(checkInTime) : undefined,
        checkOutTime: checkOutTime ? new Date(checkOutTime) : undefined,
        updatedAt: new Date()
      },
      include: { member: true, event: true }
    });

    // Update event attendance count if checked in
    if (status === 'ATTENDED' && checkInTime) {
      await prisma.event.update({
        where: { id: registration.eventId },
        data: { attendedCount: { increment: 1 } }
      });
    }

    res.json(registration);
  } catch (error) {
    console.error('Failed to update registration:', error);
    res.status(500).json({ error: 'Failed to update registration' });
  }
};

// Get event statistics
export const getEventStatistics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [totalRegistrations, confirmedRegistrations, waitlisted, attended] = await Promise.all([
      prisma.eventRegistration.count({ where: { eventId: id } }),
      prisma.eventRegistration.count({ where: { eventId: id, status: 'CONFIRMED' } }),
      prisma.eventRegistration.count({ where: { eventId: id, status: 'WAITLISTED' } }),
      prisma.eventRegistration.count({ where: { eventId: id, status: 'ATTENDED' } })
    ]);

    const event = await prisma.event.findUnique({
      where: { id },
      select: { capacity: true }
    });

    const stats = {
      totalRegistrations,
      confirmedRegistrations,
      waitlisted,
      attended,
      capacity: event?.capacity || 0,
      remainingCapacity: (event?.capacity || 0) - confirmedRegistrations,
      attendanceRate: totalRegistrations > 0 ? (attended / totalRegistrations) * 100 : 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Failed to get event statistics:', error);
    res.status(500).json({ error: 'Failed to get event statistics' });
  }
};

// Export registrations to CSV
export const exportRegistrations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId: id },
      include: {
        member: true,
        event: true
      },
      orderBy: { registrationDate: 'asc' }
    });

    // Convert to CSV
    const headers = [
      'Ticket Number',
      'Member Name',
      'Member Email',
      'Member Mobile',
      'Registration Date',
      'Status',
      'Payment Status',
      'Guests',
      'Check-in Time',
      'Check-out Time'
    ];

    const csvRows = registrations.map(reg => [
      reg.ticketNumber || 'N/A',
      reg.member.name,
      reg.member.email || 'N/A',
      reg.member.mobile,
      reg.registrationDate.toISOString(),
      reg.status,
      reg.paymentStatus,
      reg.guests,
      reg.checkInTime?.toISOString() || 'N/A',
      reg.checkOutTime?.toISOString() || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=event-${id}-registrations.csv`);
    res.send(csvContent);
  } catch (error) {
    console.error('Failed to export registrations:', error);
    res.status(500).json({ error: 'Failed to export registrations' });
  }
};