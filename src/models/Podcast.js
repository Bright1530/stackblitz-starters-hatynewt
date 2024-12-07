import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  audioUrl: {
    type: String,
    required: true
  },
  duration: Number,
  speaker: {
    name: String,
    bio: String,
    photo: String
  },
  topics: [String],
  relatedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  transcription: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    timestamp: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloadable: Boolean,
  series: {
    name: String,
    episode: Number
  }
});

export default mongoose.model('Podcast', podcastSchema);