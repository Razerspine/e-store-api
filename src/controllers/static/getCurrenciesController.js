const currencies = require('../../config/currencies');

module.exports = async (req, res) => {
  try {
    res.json(currencies);
  } catch (err) {
    res.status(500).json({message: 'Failed to load currencies', error: err.message});
  }
};
