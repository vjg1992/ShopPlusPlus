const mongoose = require('mongoose');
const connectDB = require('../../Database/DBConnection');
const insertDogProducts = require('./dogProductsData');
const insertCatProducts = require('./catProductsData');
const insertFishProducts = require('./fishProductsData');
const insertPetSupplies = require('./petSuppliesData');
const insertPetHealthProducts = require('./petHealthProductsData');
const insertPetAccessories = require('./petAccessoriesData');

const sampleData = async () => {
  try {
    await connectDB();

    await insertDogProducts();
    await insertCatProducts();
    await insertFishProducts();
    await insertPetSupplies();
    await insertPetHealthProducts();
    await insertPetAccessories();

    console.log('Sample data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
    mongoose.connection.close();
  }
};

sampleData();
