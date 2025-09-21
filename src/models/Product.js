const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    }
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: Map,
      of: String,
      required: true,
    },
    description: {
      type: Map,
      of: String,
      required: true,
    },
    price: {
      type: Map,
      of: Number,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    images: {
      type: [imageSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);
