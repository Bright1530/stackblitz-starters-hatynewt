import mongoose from 'mongoose';

const biblicalPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  modernName: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  description: {
    type: String,
    required: true
  },
  biblicalEvents: [{
    title: String,
    description: String,
    reference: String,
    date: String,
    importance: Number
  }],
  images: [{
    url: String,
    caption: String,
    source: String
  }],
  relatedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  category: {
    type: String,
    enum: ['city', 'region', 'mountain', 'river', 'sea', 'other'],
    required: true
  },
  historicalContext: String,
  archaeologicalNotes: String,
  virtualTourAvailable: Boolean
});

export default mongoose.model('BiblicalPlace', biblicalPlaceSchema);