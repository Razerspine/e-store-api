const User = require('../../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const {email, password, role} = req.body;
  const exists = await User.findOne({email});
  if (exists) {
    return res.status(400).json({message: 'Email already in use'});
  }

  const user = await User.create({email, password, role: role === 'admin' ? 'admin' : 'user'});
  const token = jwt.sign({sub: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
  res.status(201).json({token, user: {id: user._id, email: user.email, role: user.role}});
};
