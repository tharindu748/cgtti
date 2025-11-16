// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const getMembers = async (req: Request, res: Response) => {
//   try {
//     const {
//       search,
//       trade,
//       district,
//       membershipYear,
//       livingStatus,
//       paymentStatus,
//       isVerified,
//       page = 1,
//       limit = 10
//     } = req.query;

//     console.log('Query parameters:', req.query);

//     const skip = (Number(page) - 1) * Number(limit);
    
//     // Build where clause for filtering
//     const where: any = {};
    
//     if (search && search !== '') {
//       where.OR = [
//         { trainingNumber: { contains: search as string, mode: 'insensitive' } },
//         { name: { contains: search as string, mode: 'insensitive' } },
//         { nic: { contains: search as string, mode: 'insensitive' } },
//         { membershipNumber: { contains: search as string, mode: 'insensitive' } },
//         { district: { contains: search as string, mode: 'insensitive' } }
//       ];
//     }
    
//     if (trade && trade !== '') where.trade = trade;
//     if (district && district !== '') where.district = district;
//     if (membershipYear && membershipYear !== '') where.membershipYear = Number(membershipYear);
//     if (livingStatus && livingStatus !== '') where.livingStatus = livingStatus;
//     if (paymentStatus && paymentStatus !== '') where.paymentStatus = paymentStatus;
    
//     // Handle isVerified filter carefully
//     if (isVerified !== undefined && isVerified !== '') {
//       where.isVerified = isVerified === 'true';
//     }

//     console.log('Where clause:', where);

//     const [members, total] = await Promise.all([
//       prisma.member.findMany({
//         where,
//         skip,
//         take: Number(limit),
//         orderBy: { createdAt: 'desc' }
//       }),
//       prisma.member.count({ where })
//     ]);

//     console.log(`Found ${members.length} members out of ${total} total`);

//     res.json({
//       members,
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       totalPages: Math.ceil(total / Number(limit))
//     });
//   } catch (error) {
//     console.error('Failed to fetch members:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch members',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };

// export const createMember = async (req: Request, res: Response) => {
//   try {
//     const memberData = req.body;

//     // Check if unique fields already exist
//     const existingMember = await prisma.member.findFirst({
//       where: {
//         OR: [
//           { trainingNumber: memberData.trainingNumber },
//           { membershipNumber: memberData.membershipNumber },
//           { nic: memberData.nic }
//         ]
//       }
//     });

// if (existingMember) {
//   const conflictFields = [];
//   if (existingMember.trainingNumber === memberData.trainingNumber) conflictFields.push('trainingNumber');
//   if (existingMember.membershipNumber === memberData.membershipNumber) conflictFields.push('membershipNumber');
//   if (existingMember.nic === memberData.nic) conflictFields.push('NIC');

//   return res.status(400).json({ 
//     error: `Member with same ${conflictFields.join(', ')} already exists`
//   });
// }


//     const member = await prisma.member.create({
//       data: memberData
//     });

//     res.status(201).json(member);
//   } catch (error) {
//     console.error('Create member error:', error);
//     res.status(500).json({ 
//       error: 'Failed to create member',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };

// export const updateMember = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const memberData = req.body;

//     const member = await prisma.member.update({
//       where: { id },
//       data: memberData
//     });

//     res.json(member);
//   } catch (error) {
//     console.error('Failed to update member:', error);
//     res.status(500).json({ 
//       error: 'Failed to update member',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };

// export const deleteMember = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     await prisma.member.delete({
//       where: { id }
//     });

//     res.json({ message: 'Member deleted successfully' });
//   } catch (error) {
//     console.error('Failed to delete member:', error);
//     res.status(500).json({ 
//       error: 'Failed to delete member',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };



import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMembers = async (req: Request, res: Response) => {
  try {
    const {
      search,
      trade,
      district,
      membershipYear,
      livingStatus,
      paymentStatus,
      isVerified,
      page = 1,
      limit = 10
    } = req.query;

    console.log('Query parameters:', req.query);

    const skip = (Number(page) - 1) * Number(limit);
    
    // Build where clause for filtering
    const where: any = {};
    
    if (search && search !== '') {
      where.OR = [
        { trainingNumber: { contains: search as string, mode: 'insensitive' } },
        { name: { contains: search as string, mode: 'insensitive' } },
        { nic: { contains: search as string, mode: 'insensitive' } },
        { membershipNumber: { contains: search as string, mode: 'insensitive' } },
        { district: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (trade && trade !== '') where.trade = trade;
    if (district && district !== '') where.district = district;
    if (membershipYear && membershipYear !== '') where.membershipYear = Number(membershipYear);
    if (livingStatus && livingStatus !== '') where.livingStatus = livingStatus;
    if (paymentStatus && paymentStatus !== '') where.paymentStatus = paymentStatus;
    
    // Handle isVerified filter carefully
    if (isVerified !== undefined && isVerified !== '') {
      where.isVerified = isVerified === 'true';
    }

    console.log('Where clause:', where);

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.member.count({ where })
    ]);

    console.log(`Found ${members.length} members out of ${total} total`);

    res.json({
      members,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Failed to fetch members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch members',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const memberData = req.body;

    // Validate required fields
    const requiredFields = [
      'trainingNumber', 'membershipYear', 'trade', 'name', 
      'district', 'membershipNumber', 'address', 'mobile', 'nic'
    ];
    
    const missingFields = requiredFields.filter(field => !memberData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    let member;

    // Check if member with the same NIC exists
    const existingMember = await prisma.member.findFirst({
      where: {
        OR: [
          { nic: memberData.nic },
          { trainingNumber: memberData.trainingNumber },
          { membershipNumber: memberData.membershipNumber }
        ]
      }
    });

    if (existingMember) {
      // Update existing member
      member = await prisma.member.update({
        where: { 
          id: existingMember.id 
        },
        data: {
          trainingNumber: memberData.trainingNumber,
          membershipYear: Number(memberData.membershipYear),
          trade: memberData.trade,
          name: memberData.name,
          district: memberData.district,
          membershipNumber: memberData.membershipNumber,
          address: memberData.address,
          mobile: memberData.mobile,
          nic: memberData.nic,
          email: memberData.email || null,
          paymentStatus: memberData.paymentStatus || 'NON_PAID',
          livingStatus: memberData.livingStatus || 'ALIVE',
          isVerified: memberData.isVerified !== undefined ? memberData.isVerified : existingMember.isVerified
        }
      });
      
      console.log(`Updated existing member: ${member.name} (NIC: ${member.nic})`);
    } else {
      // Create new member
      member = await prisma.member.create({
        data: {
          trainingNumber: memberData.trainingNumber,
          membershipYear: Number(memberData.membershipYear),
          trade: memberData.trade,
          name: memberData.name,
          district: memberData.district,
          membershipNumber: memberData.membershipNumber,
          address: memberData.address,
          mobile: memberData.mobile,
          nic: memberData.nic,
          email: memberData.email || null,
          paymentStatus: memberData.paymentStatus || 'NON_PAID',
          livingStatus: memberData.livingStatus || 'ALIVE',
          isVerified: memberData.isVerified || false
        }
      });
      
      console.log(`Created new member: ${member.name} (NIC: ${member.nic})`);
    }

    res.status(201).json({
      member,
      action: existingMember ? 'updated' : 'created',
      message: existingMember 
        ? `Member updated successfully (NIC: ${memberData.nic})`
        : `Member created successfully (NIC: ${memberData.nic})`
    });

  } catch (error) {
    console.error('Create/Update member error:', error);
    res.status(500).json({ 
      error: 'Failed to save member',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const bulkCreateMembers = async (req: Request, res: Response) => {
  try {
    const { members } = req.body;

    // Validate request body
    if (!members || !Array.isArray(members)) {
      return res.status(400).json({
        error: 'Request body must contain a "members" array'
      });
    }

    if (members.length === 0) {
      return res.status(400).json({
        error: 'Members array cannot be empty'
      });
    }

    console.log(`Processing bulk create for ${members.length} members`);

    const results = {
      created: [] as any[],
      updated: [] as any[],
      errors: [] as any[]
    };

    // Process members sequentially to avoid database locks
    for (let i = 0; i < members.length; i++) {
      const memberData = members[i];
      
      try {
        // Validate required fields for each member
        const requiredFields = [
          'trainingNumber', 'membershipYear', 'trade', 'name', 
          'district', 'membershipNumber', 'address', 'mobile', 'nic'
        ];
        
        const missingFields = requiredFields.filter(field => !memberData[field]);
        if (missingFields.length > 0) {
          results.errors.push({
            index: i,
            trainingNumber: memberData.trainingNumber || 'Unknown',
            error: `Missing required fields: ${missingFields.join(', ')}`
          });
          continue;
        }

        // Check if member already exists (by NIC, trainingNumber, or membershipNumber)
        const existingMember = await prisma.member.findFirst({
          where: {
            OR: [
              { nic: memberData.nic },
              { trainingNumber: memberData.trainingNumber },
              { membershipNumber: memberData.membershipNumber }
            ]
          }
        });

        let savedMember;
        let action: 'created' | 'updated' = 'created';

        if (existingMember) {
          // Update existing member
          savedMember = await prisma.member.update({
            where: { 
              id: existingMember.id 
            },
            data: {
              trainingNumber: memberData.trainingNumber,
              membershipYear: Number(memberData.membershipYear),
              trade: memberData.trade,
              name: memberData.name,
              district: memberData.district,
              membershipNumber: memberData.membershipNumber,
              address: memberData.address,
              mobile: memberData.mobile,
              nic: memberData.nic,
              email: memberData.email || null,
              paymentStatus: memberData.paymentStatus || 'NON_PAID',
              livingStatus: memberData.livingStatus || 'ALIVE',
              isVerified: memberData.isVerified !== undefined ? memberData.isVerified : existingMember.isVerified
            }
          });
          results.updated.push(savedMember);
          action = 'updated';
        } else {
          // Create new member
          savedMember = await prisma.member.create({
            data: {
              trainingNumber: memberData.trainingNumber,
              membershipYear: Number(memberData.membershipYear),
              trade: memberData.trade,
              name: memberData.name,
              district: memberData.district,
              membershipNumber: memberData.membershipNumber,
              address: memberData.address,
              mobile: memberData.mobile,
              nic: memberData.nic,
              email: memberData.email || null,
              paymentStatus: memberData.paymentStatus || 'NON_PAID',
              livingStatus: memberData.livingStatus || 'ALIVE',
              isVerified: memberData.isVerified || false
            }
          });
          results.created.push(savedMember);
        }

        console.log(`${action === 'created' ? 'Created' : 'Updated'} member: ${savedMember.name} (NIC: ${savedMember.nic})`);

      } catch (error) {
        results.errors.push({
          index: i,
          trainingNumber: memberData.trainingNumber || 'Unknown',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        console.error(`Error processing member at index ${i}:`, error);
      }
    }

    // Summary
    const summary = {
      totalProcessed: members.length,
      successfullyCreated: results.created.length,
      successfullyUpdated: results.updated.length,
      totalSuccessful: results.created.length + results.updated.length,
      totalErrors: results.errors.length,
      successRate: ((results.created.length + results.updated.length) / members.length * 100).toFixed(2) + '%'
    };

    console.log('Bulk create completed:', summary);

    res.status(201).json({
      message: 'Bulk member processing completed',
      summary,
      results: {
        created: results.created.map(m => ({ id: m.id, name: m.name, nic: m.nic })),
        updated: results.updated.map(m => ({ id: m.id, name: m.name, nic: m.nic })),
        errors: results.errors
      }
    });

  } catch (error) {
    console.error('Bulk create members error:', error);
    res.status(500).json({ 
      error: 'Failed to bulk create members',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const memberData = req.body;

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id }
    });

    if (!existingMember) {
      return res.status(404).json({
        error: 'Member not found'
      });
    }

    // Check for conflicts with other members (excluding current member)
    if (memberData.trainingNumber || memberData.membershipNumber || memberData.nic) {
      const conflictingMember = await prisma.member.findFirst({
        where: {
          AND: [
            { id: { not: id } }, // Exclude current member
            {
              OR: [
                { trainingNumber: memberData.trainingNumber },
                { membershipNumber: memberData.membershipNumber },
                { nic: memberData.nic }
              ].filter(condition => condition !== undefined)
            }
          ]
        }
      });

      if (conflictingMember) {
        const conflictFields = [];
        if (conflictingMember.trainingNumber === memberData.trainingNumber) conflictFields.push('training number');
        if (conflictingMember.membershipNumber === memberData.membershipNumber) conflictFields.push('membership number');
        if (conflictingMember.nic === memberData.nic) conflictFields.push('NIC');

        return res.status(400).json({ 
          error: `Another member with same ${conflictFields.join(', ')} already exists`
        });
      }
    }

    const member = await prisma.member.update({
      where: { id },
      data: memberData
    });

    res.json(member);
  } catch (error) {
    console.error('Failed to update member:', error);
    res.status(500).json({ 
      error: 'Failed to update member',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id }
    });

    if (!existingMember) {
      return res.status(404).json({
        error: 'Member not found'
      });
    }

    await prisma.member.delete({
      where: { id }
    });

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete member:', error);
    res.status(500).json({ 
      error: 'Failed to delete member',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};