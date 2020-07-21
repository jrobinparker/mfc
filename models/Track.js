const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const TrackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  style: {
    type: String
  },
  rank: {
    type: String
  },
  lessons: [
    {
      lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons'
      }
    }
  ],
  completes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = Courses = mongoose.model('track', TrackSchema)
