const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  rank: {
    type: String,
    required: True
  },
  location: {
    type: String
  },
  favStyles: {
    type: [String]
  },
  skills: {
    type: [String]
  },
  about: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
