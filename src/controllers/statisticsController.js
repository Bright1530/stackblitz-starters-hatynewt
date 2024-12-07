import Progress from '../models/Progress.js';
import Module from '../models/Module.js';

export const getUserStatistics = async (req, res) => {
  try {
    const userId = req.userId;

    // Statistiques globales
    const progress = await Progress.find({ user: userId });
    const totalModules = await Module.countDocuments();
    const completedModules = progress.filter(p => p.completion_date).length;
    
    // Calcul du temps moyen par module
    const averageTimePerModule = progress.reduce((acc, curr) => {
      if (curr.completion_date && curr.start_date) {
        return acc + (curr.completion_date - curr.start_date);
      }
      return acc;
    }, 0) / completedModules;

    // Score moyen
    const averageScore = progress.reduce((acc, curr) => 
      acc + curr.total_points, 0) / progress.length;

    // Progression par thème
    const moduleIds = progress.map(p => p.module);
    const modules = await Module.find({ _id: { $in: moduleIds } });
    const themeProgress = modules.reduce((acc, module) => {
      acc[module.theme_biblique] = (acc[module.theme_biblique] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalModules,
      completedModules,
      progressPercentage: (completedModules / totalModules) * 100,
      averageTimePerModule,
      averageScore,
      themeProgress
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
};