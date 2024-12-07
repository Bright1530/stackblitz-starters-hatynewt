import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['verse', 'module', 'book', 'podcast'],
    required: true
  },
  content: {
    title: String,
    description: String,
    source: String,
    url: String,
    difficulty: Number
  },
  relevanceScore: Number,
  basedOn: [{
    type: String,
    itemId: mongoose.Schema.Types.ObjectId,
    weight: Number
  }],
  status: {
    type: String,
    enum: ['new', 'viewed', 'completed', 'saved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Recommendation', recommendationSchema);