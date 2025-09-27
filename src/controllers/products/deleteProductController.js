const Product = require('../../models/Product');
const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  try {
    const uuids = Array.isArray(req.params.uuid) ? req.params.uuid : [req.params.uuid];
    const products = await Product.find({uuid: {$in: uuids}});

    if (!products.length) {
      return res.status(404).json({message: 'Products not found!'});
    }

    for (const product of products) {
      if (product?.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(product.image.publicId);
        } catch (error) {
          console.log('Error deleting image from Cloudinary:', error);
        }
      }
    }

    await Product.deleteMany({uuid: {$in: uuids}});
    res.status(200).json({message: 'Products and images deleted successfully!'});
  } catch (error) {
    console.error('Error deleting products:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};
