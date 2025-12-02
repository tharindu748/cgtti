import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedEvents() {
  console.log('🌱 Seeding event data...');

  // Create sample events
  const events = [
    {
      title: "Annual Alumni Reunion 2024",
      description: "Join us for the most anticipated event of the year! Reconnect with old friends, meet new alumni, and celebrate the legacy of CGTTI.",
      shortDescription: "Annual gathering of CGTTI alumni",
      eventDate: new Date('2024-12-15'),
      startTime: "18:00",
      endTime: "22:00",
      location: "Grand Ballroom, Colombo Hilton",
      address: "2 Sir Chittampalam A Gardiner Mawatha, Colombo 02",
      city: "Colombo",
      country: "Sri Lanka",
      eventType: "IN_PERSON",
      category: "REUNION",
      tags: ["Networking", "Dinner", "Awards", "Entertainment"],
      status: "PUBLISHED",
      visibility: "ALUMNI_ONLY",
      registrationType: "FREE",
      capacity: 200,
      waitlistEnabled: true,
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      organizerName: "CGTTI Alumni Association",
      organizerEmail: "events@cgtti-alumni.org",
      organizerPhone: "+94 11 2345678",
      agenda: JSON.stringify([
        { time: "18:00", title: "Registration & Welcome", description: "Welcome drinks and networking" },
        { time: "19:00", title: "Opening Speech", description: "By Alumni Association President" },
        { time: "19:30", title: "Dinner", description: "Buffet dinner with live music" },
        { time: "21:00", title: "Awards Ceremony", description: "Recognition of outstanding alumni" }
      ]),
      speakers: JSON.stringify([
        { name: "Dr. Samantha Perera", role: "Class of 1995, CEO Tech Solutions Ltd.", bio: "Pioneer in tech industry" },
        { name: "Mr. Rajitha Fernando", role: "Class of 2005, Engineering Director", bio: "Leading engineering projects" }
      ]),
      createdBy: "admin@cgtti.com",
      updatedBy: "admin@cgtti.com"
    },
    {
      title: "Tech Career Fair 2024",
      description: "Connect with top tech companies and explore career opportunities. Perfect for recent graduates and experienced professionals.",
      shortDescription: "Career opportunities in technology sector",
      eventDate: new Date('2024-11-25'),
      startTime: "09:00",
      endTime: "17:00",
      location: "CGTTI Main Campus",
      address: "No. 125, Union Place, Colombo 02",
      city: "Colombo",
      country: "Sri Lanka",
      eventType: "HYBRID",
      category: "CAREER",
      tags: ["Job Fair", "Networking", "Workshops", "Interviews"],
      status: "PUBLISHED",
      visibility: "PUBLIC",
      registrationType: "FREE",
      capacity: 300,
      waitlistEnabled: true,
      coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
      organizerName: "CGTTI Career Services",
      organizerEmail: "careers@cgtti-alumni.org",
      agenda: JSON.stringify([
        { time: "09:00", title: "Registration", description: "Check-in and networking" },
        { time: "10:00", title: "Company Booths Open", description: "Meet with recruiters" },
        { time: "14:00", title: "Workshop: Resume Building", description: "Learn how to craft winning resumes" },
        { time: "16:00", title: "Mock Interviews", description: "Practice your interview skills" }
      ]),
      createdBy: "admin@cgtti.com",
      updatedBy: "admin@cgtti.com"
    }
  ];

  for (const eventData of events) {
    await prisma.event.upsert({
      where: { title: eventData.title },
      update: {},
      create: eventData
    });
  }

  console.log('✅ Events seeded successfully!');
}

seedEvents()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });