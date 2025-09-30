const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const {email, password, role, language, currency} = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({message: 'User not found!'});
    const update = {};

    if (email) update.email = email;
    if (password) update.password = password;
    if (role !== undefined) update.role = role;
    if (language !== undefined) update.language = language;
    if (currency !== undefined) update.currency = currency;

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, update, {new: true});
    res.json(updatedUser?.toPrivateJSON());
  } catch (error) {
    console.log(error);
    next(error);
  }
};
