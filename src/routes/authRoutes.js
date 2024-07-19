const express = require('express');

const {registerController} = require('../controllers/authController');
const {loginController }= require('../controllers/authController');
const {logoutController} = require('../controllers/authController');
const validateRegister = require('../utils/validation');
const validateLogin = require('../utils/validation');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',  registerController);
router.post('/login', loginController);
router.post('/logout', authMiddleware, logoutController);

module.exports = router;


