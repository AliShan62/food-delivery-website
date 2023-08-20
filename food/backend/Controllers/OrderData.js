const express = require("express");
const router = express.Router();
const Order = require('../models/orders'); // Make sure to import the correct  model

// In OrderData.js

router.post('/orderData', async (req, res) => {
  try {
    const { email, order_data } = req.body;

    // Check if the order with the same email already exists
    let existingOrder = await Order.findOne({ email: email });

    if (!existingOrder) {
      // If the order doesn't exist, create a new one
      const newOrder = new Order({
        email: email,
        order_data: order_data,
      });

      const savedOrder = await newOrder.save();

      res.json({ success: true, order: savedOrder });
    } else {
      // If the order exists, update it
      existingOrder.order_data = order_data;
      const updatedOrder = await existingOrder.save();

      res.json({ success: true, order: updatedOrder });
    }
  } catch (error) {
    console.log('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Error saving order' });
  }
});






router.post('/myOrderData', async (req, res) => {
  try{
  
    let myData=await Order.findOne({'email':req.body.email})
    res.json({orderData:myData})
  }catch(error){
    res.send('Server Error',error.message)
  
  }
    
  })

module.exports = router;
