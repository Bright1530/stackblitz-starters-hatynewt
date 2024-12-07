import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    text: String,
    imageUrl: String,
    audioUrl: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const interactiveQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  ageGroup: {
    type: String,
    enum: ['petite', 'grande'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'mission-tresor',
      'escalier-perseverance',
      'cercle-benedictions',
      'vision-mission',
      'plan-service',
      'meditation-priere'
    ],
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'drawing', 'multiple-choice', 'reflection'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [String],
  mediaPrompt: {
    type: String,
    url: String
  },
  responses: [responseSchema],
  order: Number,
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('InteractiveQuestion', interactiveQuestionSchema);