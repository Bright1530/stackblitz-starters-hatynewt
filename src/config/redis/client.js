import Redis from 'ioredis';
import { redisConfig } from './config.js';
import { REDIS_EVENTS, REDIS_ERRORS } from './types.js';
import { logger } from '../logger.js';

class RedisConnection {
  constructor() {
    this.client = null;
    this.isConnecting = false;
  }

  async connect() {
    if (this.client) {
      logger.warn(REDIS_ERRORS.ALREADY_CONNECTED);
      return this.client;
    }

    if (this.isConnecting) {
      return new Promise((resolve) => {
        const checkConnection = setInterval(() => {
          if (this.client) {
            clearInterval(checkConnection);
            resolve(this.client);
          }
        }, 100);
      });
    }

    this.isConnecting = true;

    try {
      this.client = new Redis(process.env.REDIS_URL, redisConfig);

      await new Promise((resolve, reject) => {
        this.client.once(REDIS_EVENTS.CONNECT, () => {
          logger.info('Redis connected successfully');
          this.isConnecting = false;
          resolve();
        });

        this.client.once(REDIS_EVENTS.ERROR, (err) => {
          logger.error('Redis connection error:', err);
          this.isConnecting = false;
          reject(err);
        });
      });

      return this.client;
    } catch (error) {
      this.isConnecting = false;
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      try {
        await this.client.quit();
        this.client = null;
        logger.info('Redis disconnected successfully');
      } catch (error) {
        logger.error('Redis disconnection error:', error);
        throw error;
      }
    }
  }

  getClient() {
    if (!this.client) {
      throw new Error(REDIS_ERRORS.NOT_INITIALIZED);
    }
    return this.client;
  }
}

export const redisConnection = new RedisConnection();