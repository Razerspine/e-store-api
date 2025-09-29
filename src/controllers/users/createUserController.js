const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const {email, password, role, language, currency} = req.body;
    if (!email || !password) {
      return res.status(400).json({message: 'Fields: email and password are required'});
    }

    const user = await User?.create({
      email,
      password,
      role,
      language,
      currency
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
