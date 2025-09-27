const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const upload = require('../middleware/upload');

const createProduct = require('../controllers/products/createProductController');
const updateProduct = require('../controllers/products/updateProductController');
const deleteProduct = require('../controllers/products/deleteProductController');
const uploadFile = require('../controllers/uploads/uploadController');
const deleteFile = require('../controllers/uploads/deleteController');
const getProducts = require('../controllers/products/getProductsController');
const getProductByUuid = require('../controllers/products/getProductByUuidController');

router.get('/products', auth, requireRole('admin'), getProducts);
router.get('/products/:uuid', auth, requireRole('admin'), getProductByUuid);
router.post('/products', auth, requireRole('admin'), createProduct);
router.patch('/products/:uuid', auth, requireRole('admin'), updateProduct);
router.delete('/products', auth, requireRole('admin'), deleteProduct);
router.post('/upload', auth, requireRole('admin'), upload.single('image'), uploadFile);
router.delete('/delete/:publicId', auth, requireRole('admin'), deleteFile);

module.exports = router;
