const express = require('express');
const views = require('../controllers/viewsController');
const authAPI = require('../controllers/authController');
// const bookingAPI = require('../controllers/bookingAPI');

// mapbox CSP
const CSP = 'Content-Security-Policy';
const POLICY =
  "connect-src 'self' https://*.mapbox.com ;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:3000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "script-src-attr 'none';" +
  "style-src 'self' https: 'unsafe-inline';" +
  'upgrade-insecure-requests;';

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.get(
  '/',
  // bookingAPI.createBookingCheckout,
  authAPI.isLoggedIn,
  views.getOverview
);
router.get('/tours/:slug', authAPI.isLoggedIn, views.getTour);
router.get('/login', authAPI.isLoggedIn, views.getLoginForm);
router.get('/me', authAPI.protect, views.getAccount);
router.get('/my-tours', authAPI.protect, views.getMyTours);

router.post('/submit-user-data', authAPI.protect, views.updateUserData);

module.exports = router;
