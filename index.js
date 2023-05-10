const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Database Connection
require('./initDB.js');

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})