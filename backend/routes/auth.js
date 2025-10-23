const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(400).json({msg:'Email already exists'});
    user = new User({name,email,password,role});
    await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'replace_this_with_a_secret',{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});
    res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

// Login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'replace_this_with_a_secret',{expiresIn:process.env.JWT_EXPIRES_IN||'7d'});
    res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});
  }catch(err){ console.error(err); res.status(500).json({msg:'Server error'}); }
});

module.exports = router;
