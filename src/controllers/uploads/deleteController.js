const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  try {
    const {publicId} = req.params;
    if (!publicId) {
      return res.status(400).json({error: 'Public ID required!'});
    }

    await cloudinary.uploader.destroy(publicId);

    res.json({message: 'File deleted from storage!', publicId});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
