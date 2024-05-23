const express = require('express');
const { getProfile, updateProfile, listPublicProfiles, getProfileById } = require('../controllers/profileController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.get('/me', protect, getProfile);

router.put(
  '/me',
  protect,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  ],
  updateProfile
);

router.get('/public', listPublicProfiles);
router.get('/:id', protect, getProfileById);

module.exports = router;
