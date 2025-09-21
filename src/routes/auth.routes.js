const router = require('express').Router();
const register = require('../controllers/auth/registerController');
const login = require('../controllers/auth/loginController');
const userInfo = require('../controllers/auth/userInfoController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/user-info', auth, userInfo);

module.exports = router;
