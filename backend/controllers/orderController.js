const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');  
const nodemailer = require('nodemailer');
const CatProduct = require('../models/CatProduct');
const DogProduct = require('../models/DogProduct');
const FishProduct = require('../models/FishProduct');
const PetAccessory = require('../models/PetAccessory');
const PetHealth = require('../models/PetHealth');
const PetSupply = require('../models/PetSupply');

const findProductById = async (productId, productModel) => {
    let product;
    switch (productModel) {
        case 'CatProduct':
            product = await CatProduct.findOne({ ProductID: productId });
            break;
        case 'DogProduct':
            product = await DogProduct.findOne({ ProductID: productId });
            break;
        case 'FishProduct':
            product = await FishProduct.findOne({ ProductID: productId });
            break;
        case 'PetAccessory':
            product = await PetAccessory.findOne({ ProductID: productId });
            break;
        case 'PetHealth':
            product = await PetHealth.findOne({ ProductID: productId });
            break;
        case 'PetSupply':
            product = await PetSupply.findOne({ ProductID: productId });
            break;
        default:
            throw new Error('Unknown product model');
    }
    return product;
};


const sendOrderConfirmationEmail = async (order, userEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vijayshankar871992@gmail.com',
            pass: 'lcwk sizj llav sgcy',
        },
    });

    const mailOptions = {
        from: 'vijayshankar871992@gmail.com',
        to: userEmail,
        subject: 'Order Confirmation',
        html: `<h1>Thank you for your order!</h1><p>Your order ID is <strong>${order._id}</strong>.</p><p>Total Price: Rs. ${order.totalPrice}</p><p>We will deliver your order soon.</p>`,
    };

    await transporter.sendMail(mailOptions);
};

exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice, paymentMethod, fromCart } = req.body;
        const userId = req.user.id;

        const orderItems = await Promise.all(items.map(async item => {
            const product = await findProductById(item.productId, item.productModel);
            if (!product) {
                throw new Error(`Product not found for ProductID: ${item.productId}`);
            }

            const image = product.Images && product.Images.length > 0 ? product.Images[0] : null;
            if (!image) {
                throw new Error(`Image not found for ProductID: ${item.productId}`);
            }

            return {
                productId: product._id,
                ProductName: product.ProductName,
                Price: product.Price,
                Weight: product.Weight,
                quantity: item.quantity,
                image: image,
                productModel: item.productModel
            };
        }));

        const calculatedTotalPrice = orderItems.reduce((total, item) => {
            return total + (item.Price * item.quantity);
        }, 0);

        if (totalPrice !== calculatedTotalPrice) {
            return res.status(400).json({ msg: 'Total price mismatch' });
        }

        const order = new Order({
            user: userId,
            items: orderItems,
            totalPrice: calculatedTotalPrice,
            paymentMethod,
            status: 'Processing',
            orderDate: new Date()
        });

        await order.save();

        if (fromCart) {
            await Cart.findOneAndUpdate(
                { user: userId },
                { $set: { items: [] } },
                { new: true }
            );
        }

        const user = await User.findById(userId);
        if (user && user.email) {
            await sendOrderConfirmationEmail(order, user.email);
        }

        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate('items.productId');

        if (!orders) {
            return res.status(404).json({ msg: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate({
            path: 'items.productId',
            select: 'ProductName weight' 
        });

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
