import User from '../models/User.js';
import Progress from '../models/Progress.js';

export const getGlobalLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select('username points badges')
      .sort('-points')
      .limit(100);
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du classement global' });
  }
};

export const getMonthlyLeaderboard = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyProgress = await Progress.aggregate([
      {
        $match: {
          completion_date: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: '$user',
          monthlyPoints: { $sum: '$total_points' }
        }
      },
      {
        $sort: { monthlyPoints: -1 }
      },
      {
        $limit: 100
      }
    ]);

    const leaderboard = await User.populate(monthlyProgress, {
      path: '_id',
      select: 'username'
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du classement mensuel' });
  }
};