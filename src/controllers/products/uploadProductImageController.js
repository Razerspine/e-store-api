const Product = require('../../models/Product');
const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({message: 'Image file is required'});
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({message: 'Not found'});
    }

    const upload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {folder: 'products', resource_type: 'image'},
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(file.buffer);
      });

    const result = await upload();

    if (!Array.isArray(product.images)) {
      product.images = [];
    }

    product.images.push({
      url: result.secure_url,
      publicId: result.public_id,
    });

    await product.save();

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (err) {
    next(err);
  }
};
