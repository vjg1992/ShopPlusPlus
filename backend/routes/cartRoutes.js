const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.post('/add', auth, cartController.addToCart);
router.delete('/remove', auth, cartController.removeFromCart); 
router.put('/update', auth, cartController.updateCartItem);
router.get('/', auth, cartController.getCart);
router.delete('/empty', auth, cartController.emptyCart);


module.exports = router;
