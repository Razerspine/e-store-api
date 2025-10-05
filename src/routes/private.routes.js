const router = require('express').Router();
const auth = require('../middleware/auth');
const requirePermission = require('../middleware/requirePermission');
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

router.get('/products', auth, requirePermission('read:products'), getProducts);
router.get('/products/:uuid', auth, requirePermission('read:products'), getProductByUuid);
router.post('/products', auth, requirePermission('create:products'), createProduct);
router.patch('/products/:uuid', auth, requirePermission('update:products'), updateProduct);
router.delete('/products', auth, requirePermission('delete:products'), deleteProduct);

router.post('/upload', auth, requirePermission('upload:files'), upload.single('image'), uploadFile);
router.delete('/delete/:publicId', auth, requirePermission('delete:files'), deleteFile);

router.get('/users', auth, requirePermission('read:users'), getUsers);
router.get('/users/:userId', auth, requirePermission('read:users'), getUser);
router.post('/users', auth, requirePermission('create:users'), createUser);
router.patch('/users/:userId', auth, requirePermission('update:users'), updateUser);
router.delete('/users', auth, requirePermission('delete:users'), deleteUser);

module.exports = router;
