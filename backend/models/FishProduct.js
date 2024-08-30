const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const FishProductSchema = new mongoose.Schema({
  weight: { type: String },
  type: { type: String },
  waterType: { type: String }
});

module.exports = BaseModel.discriminator('FishProduct', FishProductSchema);
