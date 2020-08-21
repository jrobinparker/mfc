const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  dojo: {
    type: String,
    required: true
  },
  about: [
    {
      title: {
        type: String,
        required: true
      },
      blurb: {
        type: String,
        required: true
      }
    }
  ],
});

module.exports = Settings = mongoose.model('settings', SettingsSchema);
