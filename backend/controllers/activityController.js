const Activity = require('../models/activityModel');
const mongoose = require('mongoose');

exports.addActivity = async (req, res) => {
  const userID = req.userId;
  try {
    const isAvailable = await Activity.findOne({ userID: userID });
    if (!isAvailable) {
      const activityDocument = new Activity({
        userID,
      });
      await activityDocument.save();
      res.status(201).send(activity);
    }
    const activityList = await Activity.findOneAndUpdate(
      { userID: userID },
      { $push: { activity: req.body } }
      // { new: true }
    );
    const updatedActivityList = await Activity.findOne({ userID: userID });
    res.status(201).json(updatedActivityList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateActivity = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  const {
    activityName,
    activityStart,
    activityEnd,
    repeatVar,
    repeatInterval,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Activity not exist');

  try {
    const activityCheck = await Activity.find(
      { userID: userID, 'activity._id': id },
      { 'activity.$': 1 }
    );
    if (activityCheck.length === 0) {
      return res.status(404).send('Activity not exist');
    }

    const activity = activityCheck[0].activity[0];

    await Activity.findOneAndUpdate(
      { userID: userID, 'activity._id': id },
      {
        $set: {
          'activity.$.activityName': activityName,
          'activity.$.activityStart': activityStart,
          'activity.$.activityEnd': activityEnd,
          'activity.$.repeatVar': repeatVar,
          'activity.$.repeatInterval': repeatInterval,
        },
      }
    );
    const updatedActivity = await Activity.findOne({ userID: userID });
    res.status(201).json(updatedActivity);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteActivity = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Activity not exist');

  try {
    const activityCheck = await Activity.find(
      { userID: userID, 'activity._id': id },
      { 'activity.$': 1 }
    );
    if (activityCheck.length === 0) {
      return res.status(404).send('Activity not exist');
    }

    await Activity.findOneAndUpdate(
      { userID: userID },
      { $pull: { activity: { _id: id } } }
    );
    const updatedActivity = await Activity.findOne({ userID: userID });
    res.status(201).json(updatedActivity);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllActivities = async (req, res) => {
  const userID = req.userId;
  try {
    const activities = await Activity.findOne({ userID: userID });
    res.status(200).json(activities);
    if (!activities) {
      return res.status(404).json({ msg: 'Activities not found' });
    }
    res.status(201).json(activities);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getActivity = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Activity not exist');
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    const activityCheck = await Activity.find(
      { userID: userID, 'activitiy._id': id },
      { 'activity.$': 1 }
    );
    if (taskCheck.length === 0) {
      return res.status(404).send('Activity not exist');
    }

    const activity = activityCheck[0].activity[0];
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).send(err);
  }
};
