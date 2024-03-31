const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      taskName: {
        type: String,
        required: true,
      },
      taskDescription: {
        type: String,
        required: true,
      },
      taskDeadline: {
        type: Date,
        required: true,
      },
      taskStatus: {
        type: String,
        required: true,
      },
      taskPriority: {
        type: String,
        required: true,
      },
      taskDifficulty: {
        type: String,
        required: true,
      },
    },
  ],
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
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);
