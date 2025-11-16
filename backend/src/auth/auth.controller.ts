import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // For now, use mock authentication
    // Replace with real database check later
    if (email === 'admin@cgtti.com' && password === 'admin123') {
      const token = jwt.sign(
        { id: '1', email: email, role: 'ADMIN' },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return res.json({
        token,
        user: {
          id: '1',
          email: email,
          role: 'ADMIN'
        }
      });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'MEMBER',
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    res.json({
      id: '1',
      email: 'admin@cgtti.com',
      role: 'ADMIN'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};