const Product = require('../../models/Product');
const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  const product = await Product.findOne({uuid: req.params.uuid});
  if (!product) return res.status(404).json({message: 'Not found'});
  if (product?.image && product.image?.publicId) {
    try {
      await cloudinary.uploader.destroy(product.image.publicId);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  await Product.findOne({uuid: req.params.uuid});
  res.status(200).json({message: 'Product and images deleted successfully'});
};
