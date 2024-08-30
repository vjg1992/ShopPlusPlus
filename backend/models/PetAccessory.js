const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const PetAccessorySchema = new mongoose.Schema({
  color: { type: String },
  size: { type: String },
  material: { type: String }
});

module.exports = BaseModel.discriminator('PetAccessory', PetAccessorySchema);
