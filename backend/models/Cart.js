const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        productModel: {
            type: String,
            required: true,
            enum: ['CatProduct', 'DogProduct', 'FishProduct', 'PetAccessory', 'PetHealth', 'PetSupply']
        }
    }]
});

module.exports = mongoose.model('Cart', CartSchema);
