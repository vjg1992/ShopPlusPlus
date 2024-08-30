const mongoose = require('mongoose');
const connectDB = require('../../Database/DBConnection'); 
const DogProduct = require('../DogProduct');
const CatProduct = require('../CatProduct');
const FishProduct = require('../FishProduct');
const PetAccessory = require('../PetAccessory');
const PetHealth = require('../PetHealth');
const PetSupply = require('../PetSupply');

const deleteData = async () => {
  try {
    await connectDB();

    await DogProduct.deleteMany({});
    await CatProduct.deleteMany({});
    await FishProduct.deleteMany({});
    await PetAccessory.deleteMany({});
    await PetHealth.deleteMany({});
    await PetSupply.deleteMany({});

    console.log('All existing data deleted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error deleting data:', error);
    mongoose.connection.close();
  }
};

deleteData();
