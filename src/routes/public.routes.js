const router = require('express').Router();

const getProducts = require('../controllers/products/publicGetProductsController');
const getProductByUuid = require('../controllers/products/publicGetProductByUuidController');

router.get('/products', getProducts);
router.get('/products/:uuid', getProductByUuid);

module.exports = router;
