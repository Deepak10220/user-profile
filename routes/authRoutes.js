const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { check } = require('express-validator');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

router.post('/logout', protect, logoutUser);

module.exports = router;
