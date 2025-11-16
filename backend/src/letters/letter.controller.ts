import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await prisma.letterTemplate.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(templates);
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const { name, subject, content } = req.body;
    const userId = (req as any).user.id;

    const template = await prisma.letterTemplate.create({
      data: {
        name,
        subject,
        content,
        createdBy: userId
      }
    });

    res.json(template);
  } catch (error) {
    console.error('Failed to create template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
};

export const generateLetters = async (req: Request, res: Response) => {
  try {
    const { templateId, subject, content, reason, isCustom, selectedMemberIds } = req.body;
    const userId = (req as any).user.id;

    // Get selected members
    const members = await prisma.member.findMany({
      where: {
        id: { in: selectedMemberIds }
      }
    });

    const generatedLetters = [];

    for (const member of members) {
      let finalSubject = subject;
      let finalContent = content;

      // Replace placeholders
      const placeholders: Record<string, string> = {
        '{memberName}': member.name,
        '{trainingNumber}': member.trainingNumber,
        '{membershipNumber}': member.membershipNumber,
        '{trade}': member.trade.replace(/_/g, ' '),
        '{district}': member.district,
        '{address}': member.address,
        '{mobile}': member.mobile,
        '{email}': member.email || 'Not provided',
        '{nic}': member.nic,
        '{reason}': reason,
        '{currentDate}': new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      Object.entries(placeholders).forEach(([key, value]) => {
        finalSubject = finalSubject.replace(new RegExp(key, 'g'), value);
        finalContent = finalContent.replace(new RegExp(key, 'g'), value);
      });

      const generatedLetter = await prisma.generatedLetter.create({
        data: {
          memberId: member.id,
          templateId: isCustom ? null : templateId,
          subject: finalSubject,
          content: finalContent,
          reason,
          generatedBy: userId
        },
        include: {
          member: true,
          template: true
        }
      });

      generatedLetters.push(generatedLetter);
    }

    res.json(generatedLetters);
  } catch (error) {
    console.error('Failed to generate letters:', error);
    res.status(500).json({ error: 'Failed to generate letters' });
  }
};

export const getGeneratedLetters = async (req: Request, res: Response) => {
  try {
    const letters = await prisma.generatedLetter.findMany({
      include: {
        member: true,
        template: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(letters);
  } catch (error) {
    console.error('Failed to fetch generated letters:', error);
    res.status(500).json({ error: 'Failed to fetch generated letters' });
  }
};