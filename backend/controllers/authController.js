
const userService = require('../services/userService');

async function signUp(req, res) {
  try {
    const result = await userService.signUp(req.body);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    const token = await userService.signIn(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

module.exports = {
  signUp,
  signIn
};