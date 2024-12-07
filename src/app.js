import express from 'express';
import { setupMiddleware } from './middleware/setup.js';
import { setupRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { healthCheck } from './controllers/healthController.js';

const createApp = () => {
  const app = express();

  // Setup middleware
  setupMiddleware(app);

  // Health check route
  app.get('/health', healthCheck);

  // Setup routes
  setupRoutes(app);

  // Error handler
  app.use(errorHandler);

  return app;
};

export default createApp;