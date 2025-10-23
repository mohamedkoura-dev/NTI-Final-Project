const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req,res,next){
  const header = req.headers.authorization;
  if(!header || !header.startsWith('Bearer ')) return res.status(401).json({msg:'No token'});
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'replace_this_with_a_secret');
    req.user = await User.findById(payload.id).select('-password');
    next();
  }catch(err){
    return res.status(401).json({msg:'Invalid token'});
  }
};
