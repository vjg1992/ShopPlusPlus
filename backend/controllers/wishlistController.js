const Wishlist = require('../models/Wishlist');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

const findProductById = async (productId) => {
    let product;
    if (!product) {
        product = await CatProduct.findOne({ ProductID: productId })
            || await DogProduct.findOne({ ProductID: productId })
            || await FishProduct.findOne({ ProductID: productId })
            || await PetAccessory.findOne({ ProductID: productId })
            || await PetHealth.findOne({ ProductID: productId })
            || await PetSupply.findOne({ ProductID: productId });
    }
    
    return product;
};


exports.addToWishlist = async (req, res) => {
    try {
        const { productId, productModel } = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        
        wishlist.products.push({ productId, productModel });
        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }

        wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }

        const populatedProducts = await Promise.all(wishlist.products.map(async (item) => {
            let product;
            switch (item.productModel) {
                case 'CatProduct':
                    product = await CatProduct.findOne({ ProductID: item.productId });
                    break;
                case 'DogProduct':
                    product = await DogProduct.findOne({ ProductID: item.productId });
                    break;
                case 'FishProduct':
                    product = await FishProduct.findOne({ ProductID: item.productId });
                    break;
                case 'PetAccessory':
                    product = await PetAccessory.findOne({ ProductID: item.productId });
                    break;
                case 'PetHealth':
                    product = await PetHealth.findOne({ ProductID: item.productId });
                    break;
                case 'PetSupply':
                    product = await PetSupply.findOne({ ProductID: item.productId });
                    break;
                default:
                    product = null;
            }
            return { ...item._doc, productDetails: product };
        }));

        res.status(200).json({ ...wishlist._doc, products: populatedProducts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
