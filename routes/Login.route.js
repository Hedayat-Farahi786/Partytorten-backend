const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User.model");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });


module.exports = router;
