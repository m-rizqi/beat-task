const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
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
}, {collection: 'tasks'});

module.exports = mongoose.model('Task', taskSchema);
