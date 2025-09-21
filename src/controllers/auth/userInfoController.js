module.exports = (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      role: req.user.role
    }
  });
};
