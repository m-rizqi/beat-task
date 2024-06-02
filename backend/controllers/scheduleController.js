const Schedule = require('../models/scheduleModel');

exports.addSchedule = async (req, res) => {
  const userID = req.userId;
  try {
    const isAvailable = await Schedule.findOne({ userID: userID });
    if (!isAvailable) {
      const scheduleDocument = new Schedule({ userID, ...req.body });
      await scheduleDocument.save();
      res.status(201).send(schedule);
    }
    await Schedule.findOneAndUpdate(
      { userID: userID },
      { $set: { schedule: [] } }
    );
    for (let i = 0; i < req.body.length; i++) {
      data = {
        name: req.body[i].taskName,
        startTime: req.body[i].taskStart,
        endTime: req.body[i].taskEnd,
      };
      // console.log(data);

      const scheduleList = await Schedule.findOneAndUpdate(
        { userID: userID },
        { $push: { schedule: data } }
        // { new: true }
      );
      console.log(scheduleList);
    }
    const updatedScheduleList = await Schedule.findOne({ userID: userID });
    res.status(201).json(updatedScheduleList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSchedule = async (req, res) => {
  const userID = req.userId;
  try {
    const schedule = await Schedule.findOne({ userID: userID });

    if (!schedule) {
      return res.status(404).send('Schedule not found');
    }
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).send(err);
  }
};
