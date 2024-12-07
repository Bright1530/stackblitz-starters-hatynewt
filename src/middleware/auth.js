import jwt from 'jsonwebtoken';
import { redisConnection } from '../config/redis/index.js';
import User from '../models/User.js';
import { logger } from '../config/logger.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const redisClient = redisConnection.getClient();
    const isBlacklisted = await redisClient.get(`bl_${token}`);
    
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'L\'utilisateur n\'existe plus' });
    }

    if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
      return res.status(401).json({ message: 'Mot de passe modifié, veuillez vous reconnecter' });
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};