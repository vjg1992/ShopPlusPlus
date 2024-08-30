const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const PetSupplySchema = new mongoose.Schema({
  weight: { type: String },
  dimensions: { type: String }
});

module.exports = BaseModel.discriminator('PetSupply', PetSupplySchema);
