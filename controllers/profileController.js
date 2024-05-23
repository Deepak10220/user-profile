const User = require('../models/User');
const { validationResult } = require('express-validator');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.photo = req.body.photo || user.photo;
    user.bio = req.body.bio || user.bio;
    user.phone = req.body.phone || user.phone;
    user.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : user.isPublic;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
      phone: updatedUser.phone,
      isPublic: updatedUser.isPublic,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const listPublicProfiles = async (req, res) => {
  const users = await User.find({ isPublic: true }).select('-password');
  res.json(users);
};

const getProfileById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (req.user.role === 'admin' || (user && user.isPublic)) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Not authorized to view this profile' });
  }
};

module.exports = { getProfile, updateProfile, listPublicProfiles, getProfileById };
