import Module from '../models/Module.js';
import Progress from '../models/Progress.js';

export const getModules = async (req, res) => {
  try {
    const modules = await Module.find().sort('order');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des modules' });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module non trouvé' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du module' });
  }
};

export const submitQuizAnswer = async (req, res) => {
  try {
    const { moduleId, questionId, answer } = req.body;
    const module = await Module.findById(moduleId);
    const question = module.questions.id(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }

    const isCorrect = answer === question.correct_answer;
    const pointsEarned = isCorrect ? question.points : 0;

    let progress = await Progress.findOne({ user: req.userId, module: moduleId });
    if (!progress) {
      progress = new Progress({
        user: req.userId,
        module: moduleId,
        completed_questions: []
      });
    }

    progress.completed_questions.push({
      question_id: questionId,
      correct: isCorrect,
      points_earned: pointsEarned
    });
    progress.total_points += pointsEarned;

    await progress.save();
    res.json({ correct: isCorrect, points_earned: pointsEarned });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la soumission de la réponse' });
  }
};