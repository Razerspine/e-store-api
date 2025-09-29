const router = require('express').Router();
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const upload = require('../middleware/upload');

const getProducts = require('../controllers/products/getProductsController');
const getProductByUuid = require('../controllers/products/getProductByUuidController');
const createProduct = require('../controllers/products/createProductController');
const updateProduct = require('../controllers/products/updateProductController');
const deleteProduct = require('../controllers/products/deleteProductController');

const uploadFile = require('../controllers/uploads/uploadController');
const deleteFile = require('../controllers/uploads/deleteController');

const getUsers = require('../controllers/users/getUsersController');
const getUser = require('../controllers/users/getUserContorller');
const createUser = require('../controllers/users/createUserController');
const updateUser = require('../controllers/users/updateUserController');
const deleteUser = require('../controllers/users/deleteUserController');

router.get('/products', auth, requireRole('admin'), getProducts);
router.get('/products/:uuid', auth, requireRole('admin'), getProductByUuid);
router.post('/products', auth, requireRole('admin'), createProduct);
router.patch('/products/:uuid', auth, requireRole('admin'), updateProduct);
router.delete('/products', auth, requireRole('admin'), deleteProduct);

router.post('/upload', auth, requireRole('admin'), upload.single('image'), uploadFile);
router.delete('/delete/:publicId', auth, requireRole('admin'), deleteFile);

router.get('/users', auth, requireRole('admin'), getUsers);
router.get('/users/:userId', auth, requireRole('admin'), getUser);
router.post('/users', auth, requireRole('admin'), createUser);
router.patch('/users/:userId', auth, requireRole('admin'), updateUser);
router.delete('/users', auth, requireRole('admin'), deleteUser);

module.exports = router;
