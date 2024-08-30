const ProductDetails = require('../models/BaseModel');
const DogProduct = require('../models/DogProduct');
const CatProduct = require('../models/CatProduct');
const FishProduct = require('../models/FishProduct');
const PetSupply = require('../models/PetSupply');
const PetHealth = require('../models/PetHealth');
const PetAccessory = require('../models/PetAccessory');

const createProduct = async (req, res) => {
  try {
    const { category } = req.body;
    let product;

    switch (category) {
      case 'DogProduct':
        product = new DogProduct(req.body);
        break;
      case 'CatProduct':
        product = new CatProduct(req.body);
        break;
      case 'FishProduct':
        product = new FishProduct(req.body);
        break;
      case 'PetSupply':
        product = new PetSupply(req.body);
        break;
      case 'PetHealth':
        product = new PetHealth(req.body);
        break;
      case 'PetAccessory':
        product = new PetAccessory(req.body);
        break;
      default:
        return res.status(400).send('Invalid product category');
    }

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductDetails.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    let products;

    switch (category) {
      case 'DogProduct':
        products = await DogProduct.find({});
        break;
      case 'CatProduct':
        products = await CatProduct.find({});
        break;
      case 'FishProduct':
        products = await FishProduct.find({});
        break;
      case 'PetSupply':
        products = await PetSupply.find({});
        break;
      case 'PetHealth':
        products = await PetHealth.find({});
        break;
      case 'PetAccessory':
        products = await PetAccessory.find({});
        break;
      default:
        return res.status(400).send('Invalid product category');
    }

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductDetails.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductDetails.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted');
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).send('Query parameter is missing');
    }

    const products = await ProductDetails.find({
      ProductName: { $regex: query, $options: 'i' } 
    }).limit(10).select('ProductName');

    const suggestions = products.map(product => product.ProductName);
    res.send(suggestions);
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    res.status(500).send('Internal Server Error');
  }
};



const getSearchResults = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await ProductDetails.find({
      ProductName: { $regex: query, $options: 'i' }
    });

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};



module.exports = {
  createProduct,
  getProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getSearchSuggestions,
  getSearchResults
};

