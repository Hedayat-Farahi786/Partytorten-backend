const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const Category = require('./models/Category.model.js');
const Product = require('./models/Product.model.js');


const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Database Connection
require('./initDB.js');


app.get('/', (req, res) => {
    res.send('Hello partytorten :)');
});



CategoryRoute = require('./routes/Category.route.js');
app.use('/category', CategoryRoute);



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})