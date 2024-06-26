const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    let user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUser = async (req, res) => {
  const userID = req.userId;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ name: user.name, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  const userID = req.userId;
  try {
    const user = await User.findByIdAndUpdate(userID, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
