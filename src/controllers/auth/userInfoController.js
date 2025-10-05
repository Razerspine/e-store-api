module.exports = (req, res) => {
  let userData;
  if (['admin', 'super_admin'].includes(req.user.role)) {
    userData = req.user.toPrivateJSON();
  } else {
    userData = req.user.toPublicJSON();
  }

  res.json({user: userData});
};
