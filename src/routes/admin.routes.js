const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const upload = require('../middleware/upload');

const createProduct = require('../controllers/products/createProductController');
const updateProduct = require('../controllers/products/updateProductController');
const deleteProduct = require('../controllers/products/deleteProductController');
const uploadFile = require('../controllers/products/uploadController');
const deleteFile = require('../controllers/products/deleteController');

router.post('/products', auth, requireRole('admin'), createProduct);
router.patch('/products/:uuid', auth, requireRole('admin'), updateProduct);
router.delete('/products/:uuid', auth, requireRole('admin'), deleteProduct);
router.post('/upload', auth, requireRole('admin'), upload.single('image'), uploadFile);
router.delete('/delete/:publicId', auth, requireRole('admin'), deleteFile);

module.exports = router;
