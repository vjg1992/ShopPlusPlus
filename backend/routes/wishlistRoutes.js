const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const wishlistController = require('../controllers/wishlistController');

router.post('/add', auth, wishlistController.addToWishlist);
router.post('/remove', auth, wishlistController.removeFromWishlist);
router.get('/', auth, wishlistController.getWishlist);

module.exports = router;