import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  lastLogin: Date,
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  age_group: {
    type: String,
    enum: ['enfant', 'adolescent', 'adulte'],
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  badges: [{
    type: String
  }],
  preferences: {
    musicEnabled: {
      type: Boolean,
      default: true
    },
    volume: {
      type: Number,
      default: 0.5,
      min: 0,
      max: 1
    },
    theme: {
      darkMode: Boolean,
      color: String,
      fontSize: String
    },
    notifications: {
      daily: Boolean,
      achievements: Boolean,
      groupMessages: Boolean,
      studyReminders: Boolean
    },
    accessibility: {
      screenReader: Boolean,
      highContrast: Boolean,
      reducedMotion: Boolean
    },
    language: {
      type: String,
      default: 'fr'
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
  
  next();
});

// Check if password is correct
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: {
        loginAttempts: 1
      },
      $unset: {
        lockUntil: 1
      }
    });
  }

  const updates = {
    $inc: {
      loginAttempts: 1
    }
  };

  if (this.loginAttempts + 1 >= 5) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    };
  }

  return this.updateOne(updates);
};

export default mongoose.model('User', userSchema);