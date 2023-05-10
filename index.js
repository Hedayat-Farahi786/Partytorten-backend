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
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Database Connection
require('./initDB.js');


app.get('/', async (req, res) => {
    
        const categories = await Category.insertMany([
          { name: 'Bread' },
          { name: 'Cake' },
          { name: 'Pastry' },
        ]);
      
        await Product.insertMany([
          {
            name: 'Sourdough Bread',
            price: 4.99,
            description: 'A classic sourdough bread with a crunchy crust and a soft interior.',
            image: 'https://via.placeholder.com/300',
            category: categories[0]._id,
          },
          {
            name: 'Croissant',
            price: 2.49,
            description: 'A flaky and buttery croissant that melts in your mouth.',
            image: 'https://via.placeholder.com/300',
            category: categories[2]._id,
          },
          {
            name: 'Chocolate Cake',
            price: 19.99,
            description: 'A rich and decadent chocolate cake that is perfect for any occasion.',
            image: 'https://via.placeholder.com/300',
            category: categories[1]._id,
          },
        ]);
    
    res.send('Hello partytorten :)');


})


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})