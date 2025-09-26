const languages = require('../../config/languages');

module.exports = async (req, res) => {
  try {
    res.json(languages);
  } catch (err) {
    res.status(500).json({message: 'Failed to load languages', error: err.message});
  }
};
