import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const studyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [messageSchema],
  currentChallenge: {
    title: String,
    description: String,
    target: Number,
    progress: Number,
    deadline: Date
  },
  modulesFocus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  meetingSchedule: [{
    date: Date,
    topic: String,
    isOnline: Boolean,
    link: String
  }]
});

export default mongoose.model('StudyGroup', studyGroupSchema);