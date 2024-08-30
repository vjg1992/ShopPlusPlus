const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true,
        enum: ['CatProduct', 'DogProduct', 'FishProduct', 'PetAccessory', 'PetHealth', 'PetSupply']
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    videos: [{
        type: String
    }],
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userContact: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
