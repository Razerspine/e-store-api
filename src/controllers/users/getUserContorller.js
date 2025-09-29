const User = require('../../models/User');

module.exports = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({message: 'User not found!'});
  res.json(user?.toPrivateJSON());
};
