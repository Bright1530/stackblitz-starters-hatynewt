import Progress from '../models/Progress.js';
import User from '../models/User.js';

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.userId })
      .populate('module', 'title order')
      .sort('module.order');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la progression' });
  }
};

export const updateBadges = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const totalPoints = user.points;

    const newBadges = [];
    if (totalPoints >= 100 && !user.badges.includes('Débutant')) {
      newBadges.push('Débutant');
    }
    if (totalPoints >= 1000 && !user.badges.includes('Expert')) {
      newBadges.push('Expert');
    }

    if (newBadges.length > 0) {
      user.badges.push(...newBadges);
      await user.save();
    }

    res.json({ badges: user.badges, newBadges });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des badges' });
  }
};