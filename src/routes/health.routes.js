const router = require('express').Router();
const health = require('../controllers/health/healthController');

router.get('/health', health);
module.exports = router;
