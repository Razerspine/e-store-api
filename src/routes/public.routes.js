const router = require('express').Router();
const getProducts = require('../controllers/products/getProductsController');
const getProductByUuid = require('../controllers/products/getProductByUuidController');

router.get('/products', getProducts);
router.get('/products/:uuid', getProductByUuid);

module.exports = router;
