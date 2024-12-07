import { logger } from '../config/logger.js';
import { config } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Server error:', err);
  
  res.status(err.status || 500).json({ 
    status: 'error',
    message: config.server.env === 'production' 
      ? 'Une erreur est survenue' 
      : err.message 
  });
};