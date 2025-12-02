import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '@auth/auth.middleware';

const prisma = new PrismaClient();

// Validation helper
const validateEventData = (data: any) => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title is required and must be at least 3 characters');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description is required and must be at least 10 characters');
  }

  if (!data.eventDate) {
    errors.push('Event date is required');
  } else if (new Date(data.eventDate) < new Date()) {
    errors.push('Event date cannot be in the past');
  }

  if (!data.startTime) {
    errors.push('Start time is required');
  }

  if (!data.endTime) {
    errors.push('End time is required');
  } else if (data.startTime && data.endTime && data.startTime >= data.endTime) {
    errors.push('End time must be after start time');
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.push('Location is required and must be at least 3 characters');
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.push('Address is required and must be at least 5 characters');
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.push('City is required');
  }

  if (!data.country || data.country.trim().length < 2) {
    errors.push('Country is required');
  }

  if (data.capacity && (data.capacity < 1 || data.capacity > 10000)) {
    errors.push('Capacity must be between 1 and 10000');
  }

  if (data.price && (data.price < 0 || data.price > 1000000)) {
    errors.push('Price must be between 0 and 1,000,000');
  }

  if (data.registrationDeadline && new Date(data.registrationDeadline) > new Date(data.eventDate)) {
    errors.push('Registration deadline cannot be after event date');
  }

  return errors;
};

// Create new event
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventData = req.body;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // Validate user
    if (!userId || !userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Validate event data
    const validationErrors = validateEventData(eventData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validationErrors 
      });
    }

    // Parse data
    const parsedEventData = {
      title: eventData.title.trim(),
      description: eventData.description.trim(),
      shortDescription: eventData.shortDescription?.trim() || eventData.description.trim().substring(0, 150),
      eventDate: new Date(eventData.eventDate),
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      location: eventData.location.trim(),
      address: eventData.address.trim(),
      city: eventData.city.trim(),
      country: eventData.country.trim(),
      eventType: eventData.eventType || 'IN_PERSON',
      category: eventData.category || 'GENERAL',
      tags: Array.isArray(eventData.tags) ? eventData.tags : 
            (eventData.tags ? eventData.tags.split(',').map((t: string) => t.trim()) : []),
      status: eventData.status || 'DRAFT',
      visibility: eventData.visibility || 'ALUMNI_ONLY',
      registrationType: eventData.registrationType || 'FREE',
      price: eventData.price ? parseFloat(eventData.price) : null,
      currency: eventData.currency || 'LKR',
      capacity: parseInt(eventData.capacity) || 100,
      waitlistEnabled: eventData.waitlistEnabled === 'true' || eventData.waitlistEnabled === true,
      registrationDeadline: eventData.registrationDeadline ? new Date(eventData.registrationDeadline) : null,
      coverImage: eventData.coverImage?.trim(),
      galleryImages: Array.isArray(eventData.galleryImages) ? eventData.galleryImages : [],
      organizerName: eventData.organizerName?.trim() || 'CGTTI Alumni Association',
      organizerEmail: eventData.organizerEmail?.trim() || userEmail,
      organizerPhone: eventData.organizerPhone?.trim(),
      agenda: eventData.agenda ? JSON.stringify(eventData.agenda) : null,
      speakers: eventData.speakers ? JSON.stringify(eventData.speakers) : null,
      createdBy: userEmail,
      updatedBy: userEmail
    };

    // Create event
    const event = await prisma.event.create({
      data: parsedEventData
    });

    // If event is published, set publishedAt
    if (event.status === 'PUBLISHED') {
      await prisma.event.update({
        where: { id: event.id },
        data: { publishedAt: new Date() }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Failed to create event:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'An event with similar details already exists' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create event',
      details: error.message 
    });
  }
};

// Update event
export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // Validate user
    if (!userId || !userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check permissions (only admin or creator can update)
    const isAdmin = req.user?.role === 'ADMIN';
    const isCreator = existingEvent.createdBy === userEmail;
    
    if (!isAdmin && !isCreator) {
      return res.status(403).json({ 
        error: 'You do not have permission to update this event' 
      });
    }

    // Validate event data
    const validationErrors = validateEventData(eventData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validationErrors 
      });
    }

    // Parse data
    const parsedEventData: any = {
      title: eventData.title.trim(),
      description: eventData.description.trim(),
      shortDescription: eventData.shortDescription?.trim() || eventData.description.trim().substring(0, 150),
      eventDate: new Date(eventData.eventDate),
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      location: eventData.location.trim(),
      address: eventData.address.trim(),
      city: eventData.city.trim(),
      country: eventData.country.trim(),
      eventType: eventData.eventType,
      category: eventData.category,
      tags: Array.isArray(eventData.tags) ? eventData.tags : 
            (eventData.tags ? eventData.tags.split(',').map((t: string) => t.trim()) : existingEvent.tags),
      status: eventData.status,
      visibility: eventData.visibility,
      registrationType: eventData.registrationType,
      price: eventData.price ? parseFloat(eventData.price) : null,
      capacity: parseInt(eventData.capacity),
      waitlistEnabled: eventData.waitlistEnabled === 'true' || eventData.waitlistEnabled === true,
      registrationDeadline: eventData.registrationDeadline ? new Date(eventData.registrationDeadline) : null,
      coverImage: eventData.coverImage?.trim(),
      galleryImages: Array.isArray(eventData.galleryImages) ? eventData.galleryImages : existingEvent.galleryImages,
      organizerName: eventData.organizerName?.trim() || existingEvent.organizerName,
      organizerEmail: eventData.organizerEmail?.trim() || existingEvent.organizerEmail,
      organizerPhone: eventData.organizerPhone?.trim(),
      agenda: eventData.agenda ? JSON.stringify(eventData.agenda) : existingEvent.agenda,
      speakers: eventData.speakers ? JSON.stringify(eventData.speakers) : existingEvent.speakers,
      updatedBy: userEmail,
      updatedAt: new Date()
    };

    // If updating to published status from draft, set publishedAt
    if (existingEvent.status === 'DRAFT' && eventData.status === 'PUBLISHED') {
      parsedEventData.publishedAt = new Date();
    }

    // Update event
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: parsedEventData
    });

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Failed to update event:', error);
    res.status(500).json({ 
      error: 'Failed to update event',
      details: error.message 
    });
  }
};

// Delete event
export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // Validate user
    if (!userId || !userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Only admin can delete events
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ 
        error: 'Admin access required to delete events' 
      });
    }

    // Check if event has registrations
    const registrationCount = await prisma.eventRegistration.count({
      where: { eventId: id }
    });

    if (registrationCount > 0) {
      return res.status(400).json({
        error: 'Cannot delete event with existing registrations',
        registrationCount
      });
    }

    // Delete event
    await prisma.event.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete event:', error);
    res.status(500).json({ 
      error: 'Failed to delete event',
      details: error.message 
    });
  }
};

// Duplicate event
export const duplicateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    // Validate user
    if (!userId || !userEmail) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get existing event
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create duplicate with modified title and reset stats
    const duplicatedEvent = await prisma.event.create({
      data: {
        title: `${existingEvent.title} (Copy)`,
        description: existingEvent.description,
        shortDescription: existingEvent.shortDescription,
        eventDate: new Date(existingEvent.eventDate.getTime() + 7 * 24 * 60 * 60 * 1000), // Add 7 days
        startTime: existingEvent.startTime,
        endTime: existingEvent.endTime,
        location: existingEvent.location,
        address: existingEvent.address,
        city: existingEvent.city,
        country: existingEvent.country,
        eventType: existingEvent.eventType,
        category: existingEvent.category,
        tags: existingEvent.tags,
        status: 'DRAFT', // Always duplicate as draft
        visibility: existingEvent.visibility,
        registrationType: existingEvent.registrationType,
        price: existingEvent.price,
        currency: existingEvent.currency,
        capacity: existingEvent.capacity,
        waitlistEnabled: existingEvent.waitlistEnabled,
        registrationDeadline: existingEvent.registrationDeadline ? 
          new Date(existingEvent.registrationDeadline.getTime() + 7 * 24 * 60 * 60 * 1000) : null,
        coverImage: existingEvent.coverImage,
        galleryImages: existingEvent.galleryImages,
        organizerName: existingEvent.organizerName,
        organizerEmail: existingEvent.organizerEmail,
        organizerPhone: existingEvent.organizerPhone,
        agenda: existingEvent.agenda,
        speakers: existingEvent.speakers,
        createdBy: userEmail,
        updatedBy: userEmail
      }
    });

    res.status(201).json({
      success: true,
      message: 'Event duplicated successfully',
      event: duplicatedEvent
    });
  } catch (error) {
    console.error('Failed to duplicate event:', error);
    res.status(500).json({ 
      error: 'Failed to duplicate event',
      details: error.message 
    });
  }
};

// Get event categories
export const getEventCategories = async (req: Request, res: Response) => {
  try {
    const categories = [
      { value: 'REUNION', label: 'Reunion', description: 'Alumni gatherings and meetups' },
      { value: 'CAREER', label: 'Career Fair', description: 'Job opportunities and networking' },
      { value: 'WORKSHOP', label: 'Workshop', description: 'Skill development sessions' },
      { value: 'SEMINAR', label: 'Seminar', description: 'Educational presentations' },
      { value: 'CONFERENCE', label: 'Conference', description: 'Large scale professional events' },
      { value: 'SOCIAL', label: 'Social Event', description: 'Casual gatherings and parties' },
      { value: 'SPORTS', label: 'Sports Event', description: 'Sports competitions and games' },
      { value: 'NETWORKING', label: 'Networking', description: 'Professional networking events' },
      { value: 'CHARITY', label: 'Charity Event', description: 'Fundraising and charity events' },
      { value: 'GENERAL', label: 'General Event', description: 'Other types of events' }
    ];

    res.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get event type options
export const getEventTypes = async (req: Request, res: Response) => {
  try {
    const types = [
      { value: 'IN_PERSON', label: 'In-Person', icon: '📍', description: 'Physical location event' },
      { value: 'VIRTUAL', label: 'Virtual', icon: '💻', description: 'Online event' },
      { value: 'HYBRID', label: 'Hybrid', icon: '🔄', description: 'Both in-person and online' }
    ];

    res.json(types);
  } catch (error) {
    console.error('Failed to fetch event types:', error);
    res.status(500).json({ error: 'Failed to fetch event types' });
  }
};

// Upload event image
export const uploadEventImage = async (req: AuthRequest, res: Response) => {
  try {
    // Note: For production, you would use multer or cloud storage
    // This is a simplified version
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Validate URL
    try {
      new URL(imageUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // In production, you would:
    // 1. Upload to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Resize and optimize images
    // 3. Generate thumbnails
    // 4. Store in database

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Failed to upload image:', error);
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
};