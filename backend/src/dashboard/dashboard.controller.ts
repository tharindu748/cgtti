import { Request, Response } from 'express';
import { PrismaClient, Trade } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // 1. මුළු සාමාජිකයින් ගණන (Total Members)
    const totalMembers = await prisma.member.count();

    // 2. Active Members (උදාහරණයක් විදියට අන්තිම මාස 6 තුළ register වුණු අය)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const activeMembers = await prisma.member.count({
      where: {
        createdAt: { gte: sixMonthsAgo }
      }
    });

    // 3. Trade Enrollments (එක් එක් Trade එකට ඉන්න සාමාජිකයින් ගණන)
    // Prisma groupBy පාවිච්චි කරලා ලේසියෙන්ම ගන්න පුළුවන්
    const tradeCounts = await prisma.member.groupBy({
      by: ['trade'],
      _count: {
        trade: true,
      },
    });

    // 4. Paid vs Non-Paid (අවශ්‍ය නම් පෙන්නන්න පුළුවන්)
    const paidMembers = await prisma.member.count({
      where: { paymentStatus: 'PAID' }
    });

    // Data ටික හදාගන්න
    const tradeEnrollments: Record<string, number> = {};
    
    // හැම trade එකකටම default 0 දාලා, තියෙන ඒවට අගය දාන්න
    Object.values(Trade).forEach(trade => {
      tradeEnrollments[trade] = 0;
    });

    tradeCounts.forEach(group => {
      tradeEnrollments[group.trade] = group._count.trade;
    });

    res.json({
      totalMembers,
      activeMembers,
      paidMembers,
      tradeEnrollments
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};