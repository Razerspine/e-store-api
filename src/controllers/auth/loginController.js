const User = require('../../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({message: 'Invalid credentials'});
  const token = jwt.sign({sub: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
  const userData = ['admin', 'super_admin'].includes(user.role) ? user?.toPrivateJSON() : user?.toPublicJSON();
  res.json({token, user: userData});
};
