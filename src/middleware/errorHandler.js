module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.message && err.message.includes('Only image files allowed')) {
    return res.status(400).json({message: err.message});
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({message: err.message});
  }
  if (err.name === 'CastError') {
    return res.status(400).json({message: 'Invalid ID format'});
  }
  if (err.code && err.code === 11000) {
    return res.status(400).json({message: 'Duplicate key error'});
  }
  if (err.status) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Internal Server Error'});
};
