const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

const PetHealthSchema = new mongoose.Schema({
  ingredients: { type: String },
  weight: { type: String },
  dosage: { type: String },
  ageRange: { type: String }
});

module.exports = BaseModel.discriminator('PetHealth', PetHealthSchema);
