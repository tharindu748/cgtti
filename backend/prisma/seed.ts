import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@cgtti.com' },
    update: {},
    create: {
      email: 'admin@cgtti.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  // Create default letter templates - use createMany
  const defaultTemplates = [
    {
      name: 'Membership Certificate',
      subject: 'Membership Certificate - {memberName}',
      content: 'Dear {memberName},\n\nThis certifies your membership.\n\nBest regards,',
      createdBy: 'system'
    },
    {
      name: 'Event Invitation',
      subject: 'Invitation: Alumni Event', 
      content: 'Dear {memberName},\n\nYou are invited to our event.\n\nRegards,',
      createdBy: 'system'
    }
  ];

  // Delete existing templates and create new ones
  await prisma.letterTemplate.deleteMany();
  await prisma.letterTemplate.createMany({
    data: defaultTemplates
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin user: admin@cgtti.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
