const Product = require('../../models/Product');
const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  const product = await Product.findOne({uuid: req.params.uuid});
  if (!product) return res.status(404).json({message: 'Not found'});
  for (const img of product.images) {
    try {
      await cloudinary.uploader.destroy(img.publicId);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  await Product.findOne({uuid: req.params.uuid});
  res.status(200).json({message: 'Product and images deleted successfully'});
};
