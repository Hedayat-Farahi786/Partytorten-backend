const express = require("express");
const Order = require("../models/Order.model");
const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ user: req.params.userId });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

router.post("/", async (req, res) => {
    try {
      const data = req.body;  
      const totalOrders = await Order.find();
        
      data.orderNumber = 1000 + totalOrders.length;  
      const order = new Order(data);
      await order.save();
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

router.get("/single/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


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
