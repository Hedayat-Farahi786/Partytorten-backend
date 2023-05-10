const express = require("express");
const Order = require("../models/Order.model");
const router = express.Router();

router.get("/:customerId", async (req, res) => {
    try {
      const orders = await Order.find({ customer: req.params.customerId });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

router.post("/", async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

// router.get("/:id", getSingleCategory);

router.patch("/:id", async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

router.delete("/:id",  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: 'Order deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

module.exports = router;