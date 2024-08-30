const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const CatProductSchema = new mongoose.Schema({
  weight: { type: String },
  ageRange: { type: String },
  flavor: { type: String },
  ingredients: { type: String }
});

module.exports = BaseModel.discriminator('CatProduct', CatProductSchema);
