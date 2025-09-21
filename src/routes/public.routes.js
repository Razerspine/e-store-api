const router = require('express').Router();
const getProducts = require('../controllers/products/getProductsController');
const getProductById = require('../controllers/products/getProductByIdController');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

module.exports = router;
