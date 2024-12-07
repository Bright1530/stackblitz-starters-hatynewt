import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import { configureCors } from '../config/cors.js';

export const setupMiddleware = (app) => {
  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Configure CORS
  configureCors(app);

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });
  app.use('/api/', limiter);

  // Body parser
  app.use(express.json({ limit: '10kb' }));

  return app;
};