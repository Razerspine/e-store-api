const multer = require('multer');
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images can be uploaded!'), false);
  }
}

const upload = multer({storage, fileFilter});

module.exports = upload;
