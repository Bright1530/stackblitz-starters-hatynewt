import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: String,
  category: {
    type: String,
    enum: ['gratitude', 'supplication', 'intercession', 'adoration'],
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  reminderTime: Date,
  completedDates: [Date],
  streak: {
    type: Number,
    default: 0
  },
  tags: [String],
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export default mongoose.model('Prayer', prayerSchema);