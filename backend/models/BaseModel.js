const mongoose = require('mongoose');
const { Schema } = mongoose;

const baseOptions = {
  discriminatorKey: 'category',
  collection: 'products'
};

const BaseSchema = new Schema({
  ProductID: {
    type: String,
    required: true,
    unique: true
  },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  SubCategoryType: { type: String, required: true },
  Brand: { type: String, required: true },
  Description: { type: String, required: true },
  SKU: { type: String, required: true },
  Price: { type: Number, required: true },
  DiscountedPrice: { type: Number },
  StockQuantity: { type: Number, required: true },
  AvailabilityStatus: { type: String },
  Images: [{ type: String }],
  Videos: [{ type: String }],
  Rating: { type: Number },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date },
  UpdatedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  Vendor: {
    vendor_id: { type: Schema.Types.ObjectId, ref: 'Vendor' }
  }
}, baseOptions);

module.exports = mongoose.model('ProductDetails', BaseSchema);
