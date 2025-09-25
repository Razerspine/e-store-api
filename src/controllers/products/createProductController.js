const Product = require('../../models/Product');

module.exports = async (req, res, next) => {
  try {
    const {name, description, category, price, sku, image, isActive} = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({message: 'Fields: name, description and price are required'});
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      sku,
      image,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
