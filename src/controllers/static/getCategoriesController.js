const categories = require('../../config/categories');

module.exports = async (req, res) => {
  try {
    res.json(categories);
  } catch (err) {
    res.status(500).json({message: 'Failed to load categories', error: err.message});
  }
};
