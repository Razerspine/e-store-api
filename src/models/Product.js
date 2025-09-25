const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

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
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
      immutable: true
    },
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
    category: {
      type: String,
      default: 'all',
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
    image: {
      type: imageSchema,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true, toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.id;
      }
    }
  }
);

module.exports = mongoose.model('Product', productSchema);
