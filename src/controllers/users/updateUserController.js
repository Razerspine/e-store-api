const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const {email, password, role, language, currency} = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({message: 'User not found!'});

    if (email) user.email = email;
    if (password) user.password = password;
    if (role !== undefined) user.role = role;
    if (language !== undefined) user.language = language;
    if (currency !== undefined) user.currency = currency;

    await user?.save();
    res.json(user?.toPrivateJSON());
  } catch (error) {
    console.log(error);
    next(error);
  }
};
