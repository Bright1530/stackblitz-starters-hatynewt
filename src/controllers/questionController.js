import InteractiveQuestion from '../models/InteractiveQuestion.js';

export const getQuestionsByAgeGroup = async (req, res) => {
  try {
    const { ageGroup, category } = req.query;
    const questions = await InteractiveQuestion.find({
      ageGroup,
      category,
      isActive: true
    }).sort('order');
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des questions' });
  }
};

export const submitResponse = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    
    const question = await InteractiveQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question non trouvée' });
    }

    question.responses.push({
      user: req.userId,
      content
    });

    await question.save();
    res.status(201).json({ message: 'Réponse enregistrée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la réponse' });
  }
};