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
mongoose.connect('mongodb+srv://hedayat_farahi:database.mongo123@cluster0.zmydvyp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/', (req, res) => {
    res.send('Hello partytorten :)');
});



// CategoryRoute = require('./routes/Category.route.js');
// app.use('/category', CategoryRoute);



app.get("/category", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.post("/category", async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})