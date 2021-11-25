const express = require('express');

const userAPI = require('../controllers/userAPI');
const authAPI = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authAPI.signup);
router.post('/login', authAPI.login);
router.get('/logout', authAPI.logout);

router.post('/forgotPassword', authAPI.forgotPassword);
router.patch('/resetPassword/:token', authAPI.resetPassword);

// below routes are protected after this middleware
router.use(authAPI.protect);

router.patch('/updateMyPassword', authAPI.updatePassword);
router.get('/me', userAPI.getMe, userAPI.getUser);
router.patch(
  '/updateMe',
  userAPI.uploadUserPhoto,
  userAPI.resizeUserPhoto,
  userAPI.updateMe
);
router.delete('/deleteMe', userAPI.deleteMe);

// below routes are Authorized by admin only
router.use(authAPI.restrictTo('admin'));

// users
router.get('/', userAPI.getAllUsers);
router.get('/:id', userAPI.getUser);
router.post('/', userAPI.createUser);
router.patch('/:id', userAPI.updateUser);
router.delete('/:id', userAPI.deleteUser);

module.exports = router;
