const Review = require('../models/Review');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');
const User = require('../models/User');
const Order = require('../models/Order');

const findProductById = async (productId) => {
    let product = await CatProduct.findOne({ ProductID: productId })
        || await DogProduct.findOne({ ProductID: productId })
        || await FishProduct.findOne({ ProductID: productId })
        || await PetAccessory.findOne({ ProductID: productId })
        || await PetHealth.findOne({ ProductID: productId })
        || await PetSupply.findOne({ ProductID: productId });
    return product;
};

exports.addReview = async (req, res) => {
    try {
        const { productId, title, description, rating } = req.body;
        const userId = req.user._id;

        if (!productId || !title || !description || !rating) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const existingReview = await Review.findOne({ user: userId, productId });
        if (existingReview) {
            return res.status(400).json({ msg: 'You have already reviewed this product.' });
        }

        const user = await User.findById(userId);
        const order = await Order.findOne({ user: userId, 'items.productId': product._id });

        if (!order) {
            return res.status(400).json({ msg: 'You need to purchase the product before reviewing.' });
        }

        const images = req.files && req.files['images'] 
            ? req.files['images'].map(file => `/uploads/${file.filename}`) 
            : [];
        const videos = req.files && req.files['videos'] 
            ? req.files['videos'].map(file => `/uploads/${file.filename}`) 
            : [];


        const review = new Review({
            user: user._id,
            productId: product.ProductID,
            productModel: product.constructor.modelName,
            title,
            description,
            rating,
            images,
            videos,
            userName: user.name,
            userEmail: user.email,
            userContact: user.mobile,
            orderDate: order.orderDate
        });

        await review.save();

        res.status(201).json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const reviews = await Review.find({ productId })
            .populate('user', 'name email');

        if (!reviews.length) {
            return res.status(404).json({ msg: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReviewsByUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const reviews = await Review.find({ user: userId }).lean();

        const reviewsWithProductDetails = await Promise.all(reviews.map(async (review) => {
            const product = await findProductById(review.productId);
            
            if (product) {
                return {
                    ...review,
                    productName: product.ProductName,
                    productPrice: product.Price,
                    product_Id: product._id,
                };
            } else {
                return {
                    ...review,
                    productName: 'Unknown Product',
                    productPrice: 'N/A',
                    productDbId: null,
                };
            }
        }));

        if (!reviewsWithProductDetails.length) {
            return res.status(404).json({ msg: 'No reviews found for this user' });
        }

        res.status(200).json(reviewsWithProductDetails);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
