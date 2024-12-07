import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correct_answer: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  explanation: String,
  references: [{
    book: String,
    chapter: Number,
    verse: Number
  }],
  mediaContent: {
    type: {
      type: String,
      enum: ['image', 'video', 'audio']
    },
    url: String
  }
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  theme_biblique: {
    type: String,
    required: true
  },
  questions: [questionSchema],
  enigmes: [{
    titre: String,
    description: String,
    indice: String,
    solution: String,
    points: Number,
    mediaContent: {
      type: {
        type: String,
        enum: ['image', 'video', 'audio']
      },
      url: String
    }
  }],
  resources: [{
    type: {
      type: String,
      enum: ['article', 'video', 'podcast', 'book']
    },
    title: String,
    url: String,
    description: String
  }],
  prerequisites: [{
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    },
    requiredScore: Number
  }],
  adaptiveDifficulty: {
    enabled: Boolean,
    baseLevel: Number,
    adjustmentFactor: Number
  },
  culturalContext: {
    region: String,
    historicalPeriod: String,
    customContent: mongoose.Schema.Types.Mixed
  },
  offlineAvailable: Boolean,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Module', moduleSchema);