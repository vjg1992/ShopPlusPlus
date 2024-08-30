const Cart = require('../models/Cart');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

const findProductById = async (productId) => {
    let product = await CatProduct.findOne({ ProductID: productId })
        || await DogProduct.findOne({ ProductID: productId })
        || await FishProduct.findOne({ ProductID: productId })
        || await PetAccessory.findOne({ ProductID: productId })
        || await PetHealth.findOne({ ProductID: productId })
        || await PetSupply.findOne({ ProductID: productId });
    return product;
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, productModel } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await findProductById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.productModel === productModel);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, productModel });
        }

        await cart.save();

        res.status(200).json({cart, itemCount: cart.items.length});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId, productModel } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => !(item.productId === productId && item.productModel === productModel));
        
        await cart.save();

        res.status(200).json({cart, itemCount: cart.items.length});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity, productModel } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.productModel === productModel);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        await cart.save();

        res.status(200).json({cart, itemCount: cart.items.length});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        
         const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

         const populatedItems = await Promise.all(cart.items.map(async (item) => {
            let productModel;
            switch (item.productModel) {
                case 'CatProduct':
                    productModel = CatProduct;
                    break;
                case 'DogProduct':
                    productModel = DogProduct;
                    break;
                case 'FishProduct':
                    productModel = FishProduct;
                    break;
                case 'PetAccessory':
                    productModel = PetAccessory;
                    break;
                case 'PetHealth':
                    productModel = PetHealth;
                    break;
                case 'PetSupply':
                    productModel = PetSupply;
                    break;
                default:
                    productModel = null;
            }

            if (productModel) {
                const productDetails = await productModel.findOne({ ProductID: item.productId });
                return { ...item._doc, productId: productDetails };  
            } else {
                return item;
            }
        }));

         res.status(200).json({ ...cart._doc, items: populatedItems });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.emptyCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        cart.items = [];
        await cart.save();
        res.status(200).json({ msg: 'Cart emptied successfully', cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

