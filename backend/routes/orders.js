const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place order (mock)
router.post('/', auth, async (req,res)=>{
  const cart = await Cart.findOne({user:req.user._id}).populate('items.product');
  if(!cart || cart.items.length===0) return res.status(400).json({msg:'Cart empty'});
  const items = cart.items.map(i=>({product:i.product._id, qty:i.qty}));
  const total = cart.items.reduce((s,i)=>s + (i.product.price * i.qty),0);
  const order = new Order({user:req.user._id, items, total});
  await order.save();
  // empty cart
  cart.items = [];
  await cart.save();
  res.json(order);
});

// Get user orders
router.get('/', auth, async (req,res)=>{
  const orders = await Order.find({user:req.user._id}).populate('items.product');
  res.json(orders);
});

module.exports = router;
