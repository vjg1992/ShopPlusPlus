const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/productController');
const { getSearchSuggestions } = require('../controllers/productController');
const { getSearchResults } = require('../controllers/productController');

router.get('/search', getSearchResults);
router.get('/suggestions', getSearchSuggestions);
router.post('/create', auth, productController.createProduct);
router.get('/:id', productController.getProduct);  
router.get('/category/:category', productController.getProductsByCategory);  
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);


module.exports = router;
