const User = require('../../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({message: 'Invalid credentials'});

  const token = jwt.sign({sub: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
  res.json({token, user: {id: user._id, email: user.email, role: user.role}});
};
