import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  completed_questions: [{
    question_id: mongoose.Schema.Types.ObjectId,
    correct: Boolean,
    points_earned: Number
  }],
  completed_enigmes: [{
    enigme_id: mongoose.Schema.Types.ObjectId,
    solved: Boolean,
    points_earned: Number
  }],
  total_points: {
    type: Number,
    default: 0
  },
  completion_date: Date
});

export default mongoose.model('Progress', progressSchema);