const router = require('express').Router();

const getProducts = require('../controllers/products/publicGetProductsController');
const getProductByUuid = require('../controllers/products/publicGetProductByUuidController');
const getLanguages = require('../controllers/static/getLanguagesController');
const getCurrencies = require('../controllers/static/getCurrenciesController');
const getCategories = require('../controllers/static/getCategoriesController');

router.get('/products', getProducts);
router.get('/products/:uuid', getProductByUuid);
// static
router.get('/languages', getLanguages);
router.get('/currencies', getCurrencies);
router.get('/categories', getCategories);

module.exports = router;
