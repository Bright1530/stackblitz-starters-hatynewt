import userRoutes from './userRoutes.js';
import moduleRoutes from './moduleRoutes.js';
import progressRoutes from './progressRoutes.js';

export const setupRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/modules', moduleRoutes);
  app.use('/api/progress', progressRoutes);
};