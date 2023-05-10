const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User.model");

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const result = await user.save();
        // const token = jwt.sign({ userId: user._id, name, email }, process.env.JWT_SECRET);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


module.exports = router;