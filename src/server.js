import { config } from './config/env.js';
import { connectDB, closeDB } from './config/db.js';
import { redisConnection } from './config/redis/index.js';
import { logger } from './config/logger.js';
import createApp from './app.js';

const app = createApp();

// Initialize server
const initializeServer = async () => {
  try {
    await connectDB();
    await redisConnection.connect();
    
    app.listen(config.server.port, () => {
      logger.info(`🚀 Server running on port ${config.server.port}`);
    });
  } catch (error) {
    logger.error('Server initialization error:', error);
    process.exit(1);
  }
};

// Graceful shutdown handler
const gracefulShutdown = async () => {
  logger.info('Initiating graceful shutdown...');
  try {
    await redisConnection.disconnect();
    await closeDB();
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
initializeServer();