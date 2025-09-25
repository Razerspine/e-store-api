const cloudinary = require('../../config/cloudinary');

module.exports = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'Файл не передан'});
    }

    const stream = cloudinary.uploader.upload_stream(
      {folder: 'uploads'},
      (error, result) => {
        if (error) return res.status(500).json({error});

        res.json({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream?.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
