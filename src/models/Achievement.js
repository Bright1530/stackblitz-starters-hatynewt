import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['learning', 'social', 'dedication', 'exploration', 'mastery'],
    required: true
  },
  requirements: {
    type: {
      type: String,
      enum: ['count', 'streak', 'score', 'time'],
      required: true
    },
    target: Number,
    timeFrame: String
  },
  rewards: {
    points: Number,
    badge: {
      icon: String,
      animation: String
    },
    unlocks: [{
      type: String,
      itemId: mongoose.Schema.Types.ObjectId
    }]
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    required: true
  },
  progressTrackable: Boolean,
  hiddenUntilUnlocked: Boolean
});

export default mongoose.model('Achievement', achievementSchema);