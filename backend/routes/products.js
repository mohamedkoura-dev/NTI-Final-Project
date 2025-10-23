const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Create (admin)
router.post('/', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({msg:'Forbidden'});
  try{
    const p = new Product(req.body);
    await p.save();
    res.json(p);
  }catch(e){ res.status(500).json({msg:'Server error'}); }
});

// Read list with simple search/filter
router.get('/', async (req,res)=>{
  const {search,category,page,limit} = req.query;
  const q = {};
  if(search) q.name = new RegExp(search,'i');
  if(category) q.category = category;
  const p = await Product.find(q).skip(((+page||1)-1)*(+limit||20)).limit(+limit||20);
  res.json(p);
});

// Get by id
router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({msg:'Not found'});
  res.json(p);
});

// Update (admin)
router.put('/:id', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({msg:'Forbidden'});
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(p);
});

// Delete (admin)
router.delete('/:id', auth, async (req,res)=>{
  if(req.user.role!=='admin') return res.status(403).json({msg:'Forbidden'});
  await Product.findByIdAndDelete(req.params.id);
  res.json({msg:'Deleted'});
});

module.exports = router;
