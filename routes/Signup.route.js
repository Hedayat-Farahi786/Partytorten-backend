const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User.model");
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const result = await user.save();
        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


module.exports = router;
