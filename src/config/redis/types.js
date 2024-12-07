/**
 * @typedef {Object} RedisConfig
 * @property {number} maxRetriesPerRequest
 * @property {boolean} enableReadyCheck
 * @property {function} retryStrategy
 * @property {function} reconnectOnError
 */

/**
 * @typedef {Object} RedisConnectionInterface
 * @property {function} connect
 * @property {function} disconnect
 * @property {function} getClient
 */

export const REDIS_EVENTS = {
  CONNECT: 'connect',
  ERROR: 'error',
  READY: 'ready',
  CLOSE: 'close'
};

export const REDIS_ERRORS = {
  NOT_INITIALIZED: 'Redis client not initialized. Call connect() first.',
  CONNECTION_FAILED: 'Failed to connect to Redis',
  ALREADY_CONNECTED: 'Redis client is already connected'
};