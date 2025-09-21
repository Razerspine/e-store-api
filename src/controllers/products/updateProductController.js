const Product = require('../../models/Product');
const cloudinary = require('cloudinary').v2;

module.exports = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, description, price, sku, images, isActive} = req.body;
    const file = req.file;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({message: 'Not found'});

    const update = {};
    if (name) update.name = name;
    if (description) update.description = description;
    if (price) update.price = price;
    if (sku !== undefined) update.sku = sku;
    if (isActive !== undefined) update.isActive = isActive;
    if (Array.isArray(images)) update.images = images;

    if (file) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        const oldImage = product.images[0];
        if (oldImage.publicId) {
          await cloudinary.uploader.destroy(oldImage.publicId);
        }
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
      const newImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      update.images = [newImage];
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, update, {new: true});
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};
