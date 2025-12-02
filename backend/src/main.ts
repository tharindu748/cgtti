// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';


// // Import routes
// import authRoutes from './auth/auth.routes.js';
// import memberRoutes from './users/member.routes.js';
// import letterRoutes from './letters/letter.routes.js';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/members', memberRoutes);
// app.use('/api/letters', letterRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     message: 'CGTTI Alumni Management API is running!',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV}`);
//   console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
//   console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
//   console.log(`👥 Member routes: http://localhost:${PORT}/api/members`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './auth/auth.routes.js';
import memberRoutes from './users/member.routes.js';
import letterRoutes from './letters/letter.routes.js';
import eventRoutes from './events/event.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware - Fixed
app.use(cors({
  origin: [
    'https://cgtti-member.netlify.app',
    'http://localhost:3000', 
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/letters', letterRoutes);
app.use('/api/events', eventRoutes);


// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'CGTTI Alumni Management API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
});