const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');

// Get cart
router.get('/', auth, async (req,res)=>{
  let cart = await Cart.findOne({user: req.user._id}).populate('items.product');
  if(!cart) cart = await Cart.create({user:req.user._id, items:[]});
  res.json(cart);
});

// Add/update item
router.post('/add', auth, async (req,res)=>{
  const {productId, qty} = req.body;
  let cart = await Cart.findOne({user:req.user._id});
  if(!cart) cart = new Cart({user:req.user._id, items:[]});
  const idx = cart.items.findIndex(i=>i.product.toString()===productId);
  if(idx>-1) cart.items[idx].qty = qty || (cart.items[idx].qty+1);
  else cart.items.push({product:productId, qty: qty||1});
  await cart.save();
  cart = await cart.populate('items.product');
  res.json(cart);
});

// Remove item
router.post('/remove', auth, async (req,res)=>{
  const {productId} = req.body;
  let cart = await Cart.findOne({user:req.user._id});
  if(!cart) return res.json({items:[]});
  cart.items = cart.items.filter(i=>i.product.toString()!==productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
