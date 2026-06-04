const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'Original URL is required'],
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastVisited: {
    type: Date,
    default: null
  },
  visits: [VisitSchema],
   password: {
    type: String,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Url', UrlSchema);
