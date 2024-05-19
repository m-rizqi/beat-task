const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    schedule: [
      {
        name: {
          type: String,
          required: true,
        },
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: 'schedule' }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
