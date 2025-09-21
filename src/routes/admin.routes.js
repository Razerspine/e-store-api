const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const upload = require('../middleware/upload');

const createProduct = require('../controllers/products/createProductController');
const updateProduct = require('../controllers/products/updateProductController');
const deleteProduct = require('../controllers/products/deleteProductController');
const uploadImage = require('../controllers/products/uploadProductImageController');

router.post('/products', auth, requireRole('admin'), upload.single('image'), createProduct);
router.patch('/products/:id', auth, requireRole('admin'), upload.single('image'), updateProduct);
router.delete('/products/:id', auth, requireRole('admin'), deleteProduct);
router.post('/products/:id/image', auth, requireRole('admin'), upload.single('image'), uploadImage);

module.exports = router;
