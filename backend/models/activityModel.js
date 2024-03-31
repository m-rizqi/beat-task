const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  activity: [
    {
      activityName: {
        type: String,
        required: true,
      },
      activityStart: {
        type: Date,
        required: true,
      },
      activityEnd: {
        type: Date,
        required: true,
      },
      repeatVar: {
        type: String,
        required: true,
      },
      repeatInterval: {
        type: Number,
        required: true,
      },
    },
  ],
}, {collection: 'activities'});

module.exports = mongoose.model('Activity', activitySchema);
