const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({message: 'Unauthorized'});

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) return res.status(401).json({message: 'Unauthorized'});

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({message: `Unauthorized ${error}`});
  }
};
