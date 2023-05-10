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



CategoryRoute = require('./routes/Category.route');
app.use('/category', CategoryRoute);





// 404 Error handling
app.use((req, res, next) => {
    next(createError(404, "Not found"));
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})