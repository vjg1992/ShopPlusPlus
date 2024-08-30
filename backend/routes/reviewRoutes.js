const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewController = require('../controllers/reviewController'); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/add', auth, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), reviewController.addReview);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.get('/user', auth, reviewController.getReviewsByUser);

module.exports = router;
