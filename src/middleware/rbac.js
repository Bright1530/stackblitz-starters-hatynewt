import User from '../models/User.js';

export const checkRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ 
          message: 'Accès non autorisé pour ce rôle' 
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ 
        message: 'Erreur lors de la vérification des droits' 
      });
    }
  };
};