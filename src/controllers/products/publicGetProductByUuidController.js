const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const product = await Product.findOne({uuid: req.params.uuid});
  if (!product) return res.status(404).json({message: 'Product not found!'});
  res.json(product?.toPublicJSON());
};
