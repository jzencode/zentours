const express = require('express');

const bookingAPI = require('../controllers/bookingAPI');
const authAPI = require('../controllers/authController');

// stripe CSP
const CSP = 'Content-Security-Policy';
const POLICY =
  "connect-src 'self' https://checkout.stripe.com ;" +
  "frame-src 'self' https://checkout.stripe.com ;" +
  "script-src 'self' https://checkout.stripe.com ;" +
  "img-src https://*.stripe.com 'self' ;";

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.use(authAPI.protect);

router.get('/checkout-session/:tourId', bookingAPI.getCheckoutSession);

router.use(authAPI.restrictTo('admin', 'lead-guide'));

router.get('/', bookingAPI.getAllBookings);
router.post('/', bookingAPI.createBooking);
router.get('/:id', bookingAPI.getBooking);
router.patch('/:id', bookingAPI.updateBooking);
router.delete('/:id', bookingAPI.deleteBooking);

module.exports = router;
