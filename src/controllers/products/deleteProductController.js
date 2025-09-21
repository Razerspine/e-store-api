const Product = require('../../models/Product');
const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({message: 'Not found'});
  for (const img of product.images) {
    try {
      await cloudinary.uploader.destroy(img.publicId);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({message: 'Product and images deleted successfully'});
};
