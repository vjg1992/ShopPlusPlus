const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/create', auth, orderController.createOrder);
router.get('/history', auth, orderController.getOrderHistory);
router.get('/:id', auth, orderController.getOrderById);
router.put('/update', auth, orderController.updateOrderStatus);

module.exports = router;
