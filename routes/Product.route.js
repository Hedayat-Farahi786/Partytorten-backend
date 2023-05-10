const express = require("express");
const Category = require("../models/Category.model");
const Product = require("../models/Product.model");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.post("/", async (req, res) => {
    try {
        // const { name, description, price, category } = req.body;
        // const product = new Product({ name, description, price, category });
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// router.get("/:id", getSingleCategory);

router.patch("/:id", async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category }, { new: true });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;