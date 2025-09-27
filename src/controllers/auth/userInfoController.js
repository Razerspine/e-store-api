module.exports = (req, res) => {
  let userData;
  if (req.user.role === 'admin') {
    userData = req.user.toPrivateJSON();
  } else {
    userData = req.user.toPublicJSON();
  }

  res.json({user: userData});
};
