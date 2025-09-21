module.exports = function validate(fields) {
  return (req, res, next) => {
    for (const f of fields) {
      if (f in req.body) continue;
      return res.status(400).json({message: `Missing field: ${f}`});
    }
    next();
  };
};
