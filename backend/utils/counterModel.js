const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const counterSchema = new Schema({
  category: { type: String, required: true, unique: true },
  sequence: { type: Number, default: 0 }
});

const CounterModel = model('CounterModel', counterSchema);
module.exports = CounterModel;
