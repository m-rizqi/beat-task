const Task = require('../models/taskModel');
const mongoose = require('mongoose');

exports.addTask = async (req, res) => {
  const userID = req.userId;
  try {
    const isAvailable = await Task.findOne({ userID: userID });
    if (!isAvailable) {
      const taskDocument = new Task({
        userID,
      });
      await taskDocument.save();
      res.status(201).send(task);
    }
    const taskList = await Task.findOneAndUpdate(
      { userID: userID },
      { $push: { tasks: req.body } }
      // { new: true }
    );
    const updatedTaskList = await Task.findOne({ userID: userID });
    res.status(201).json(updatedTaskList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateTask = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  const {
    taskName,
    taskDescription,
    taskDeadline,
    taskStatus,
    taskPriority,
    taskDifficulty,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Task not exist');

  try {
    const taskCheck = await Task.find(
      { userID: userID, 'tasks._id': id },
      { 'tasks.$': 1 }
    );
    if (taskCheck.length === 0) {
      return res.status(404).send('Task not exist');
    }

    const task = taskCheck[0].tasks[0];

    await Task.findOneAndUpdate(
      { userID: userID, 'tasks._id': id },
      {
        $set: {
          'tasks.$.taskName': taskName,
          'tasks.$.taskDescription': taskDescription,
          'tasks.$.taskDeadline': taskDeadline,
          'tasks.$.taskStatus': taskStatus,
          'tasks.$.taskPriority': taskPriority,
          'tasks.$.taskDifficulty': taskDifficulty,
        },
      }
    );

    const updatedTaskList = await Task.findOne({ userID: userID });
    res.status(201).json(updatedTaskList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteTask = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Task not exist');

  try {
    const taskCheck = await Task.find(
      { userID: userID, 'tasks._id': id },
      { 'tasks.$': 1 }
    );
    if (taskCheck.length === 0) {
      return res.status(404).send('Task not exist');
    }

    await Task.findOneAndUpdate(
      { userID: userID },
      { $pull: { tasks: { _id: id } } }
    );

    const updatedTaskList = await Task.findOne({ userID: userID });
    res.status(201).json(updatedTaskList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllTasks = async (req, res) => {
  const userID = req.userId;
  try {
    const taskList = await Task.findOne({ userID: userID });
    if (!taskList) {
      return res.status(404).json({ msg: 'Task list not found' });
    }
    res.status(201).json(taskList);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getTask = async (req, res) => {
  const userID = req.userId;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Task not exist');

  try {
    const taskCheck = await Task.find(
      { userID: userID, 'tasks._id': id },
      { 'tasks.$': 1 }
    );
    if (taskCheck.length === 0) {
      return res.status(404).send('Task not exist');
    }

    const task = taskCheck[0].tasks[0];
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};
