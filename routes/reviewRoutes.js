const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewAPI = require('../controllers/reviewAPI');
const authAPI = require('../controllers/authController');

// below routes are protected after this middleware
router.use(authAPI.protect);

router.get('/', reviewAPI.getAllReviews);
router.get('/:id', reviewAPI.getReview);
router.post(
  '/',
  authAPI.restrictTo('user'),
  reviewAPI.setTourUserIds,
  reviewAPI.createReview
);
router.patch(
  '/:id',
  authAPI.restrictTo('user', 'admin'),
  reviewAPI.updateReview
);
router.delete(
  '/:id',
  authAPI.restrictTo('user', 'admin'),
  reviewAPI.deleteReview
);

module.exports = router;
