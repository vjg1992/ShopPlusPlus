const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const purchaseController = require('../controllers/purchaseController');

router.post('/create', auth, purchaseController.createPurchase);
router.get('/history', auth, purchaseController.getPurchaseHistory);
router.get('/:id', auth, purchaseController.getPurchaseById);
router.put('/update', auth, purchaseController.updatePaymentStatus);

module.exports = router;
