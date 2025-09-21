const Product = require('../../models/Product');
const cloudinary = require('cloudinary').v2;

module.exports = async (req, res, next) => {
  try {
    const {name, description, category, price, sku, isActive} = req.body;
    const file = req.file;

    if (!name || !description || !price) {
      return res.status(400).json({message: 'Fields: name, description and price are required'});
    }

    let imageData = null;

    if (file) {
      const upload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {folder: 'products', resource_type: 'image'},
            (err, result) => (err ? reject(err) : resolve(result))
          );
          stream.end(file.buffer);
        });

      const result = await upload();
      imageData = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      sku,
      images: imageData ? [imageData] : [],
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
