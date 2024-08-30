const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'productModel'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    productModel: {
        type: String,
        required: true,
        enum: ['CatProduct', 'DogProduct', 'FishProduct', 'PetAccessory', 'PetHealth', 'PetSupply']
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Completed', 'Failed']
    },
    paymentMethod: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
