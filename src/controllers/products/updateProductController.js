const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const {name, description, category, price, sku, image, isActive} = req.body;
    const product = await Product.findOne({uuid: req.params.uuid});
    if (!product) return res.status(404).json({message: 'Product not found!'});
    const update = {};

    if (name) update.name = name;
    if (description) update.description = description;
    if (category !== undefined) update.category = category;
    if (price) update.price = price;
    if (sku !== undefined) update.sku = sku;
    if (isActive !== undefined) update.isActive = isActive;
    if (image !== undefined) update.image = image;

    const updatedProduct = await Product.findOneAndUpdate({uuid: req.params.uuid}, update, {new: true});
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};
