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
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmydvyp.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/', (req, res) => {
    res.send('Hello partytorten :)');
});

// Signup Route
SignupRoute = require('./routes/Signup.route.js');
app.use('/signup', SignupRoute);

// Login Route
LoginRoute = require('./routes/Login.route.js');
app.use('/login', LoginRoute);


// Category Route
CategoryRoute = require('./routes/Category.route.js');
app.use('/category', CategoryRoute);


// Product Route
ProductRoute = require('./routes/Product.route.js');
app.use('/products', ProductRoute);


// Order Route
OrderRoute = require('./routes/Order.route.js');
app.use('/order', OrderRoute);


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})