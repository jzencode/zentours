const express = require('express');

const router = express.Router();

const tourAPI = require('../controllers/tourAPI');
const authAPI = require('../controllers/authController');

router.use('/:tourId/reviews', require('../routes/reviewRoutes'));

// special tours routes
router.get('/top-5-tours', tourAPI.aliasTopTours, tourAPI.getAllTours);
router.get('/tour-stats', tourAPI.getTourStats);
router.get(
  '/monthly-plan/:year',
  authAPI.protect,
  authAPI.restrictTo('admin', 'lead-guide', 'guide'),
  tourAPI.getMonthlyPlan
);

// /tours-within/233/center/-40,45/unit/mi
router.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  tourAPI.getToursWithin
);

router.get('/distances/:latlng/unit/:unit', tourAPI.getDistances);

// tours routes
router.get('/', tourAPI.getAllTours);
router.get('/:id', tourAPI.getTour);
router.post(
  '/',
  authAPI.protect,
  authAPI.restrictTo('admin', 'lead-guide'),
  tourAPI.createTour
);
router.patch(
  '/:id',
  authAPI.protect,
  authAPI.restrictTo('admin', 'lead-guide'),
  tourAPI.uploadTourImages,
  tourAPI.resizeTourImages,
  tourAPI.updateTour
);
router.delete(
  '/:id',
  authAPI.protect,
  authAPI.restrictTo('admin', 'lead-guide'),
  tourAPI.deleteTour
);

module.exports = router;
