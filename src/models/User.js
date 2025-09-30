const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    language: {
      type: String,
      enum: ['en', 'uk', 'de', 'fr'],
      default: 'en',
    },
    currency: {
      type: String,
      default: 'USD',
    },
    wishList: {
      type: [String],
      default: [],
    }
  },
  {timestamps: true}
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPrivateJSON = function () {
  return {
    userId: this.id,
    email: this.email,
    role: this.role,
    language: this.language,
    currency: this.currency,
    createdAt: this.createdAt ? this.createdAt.getTime() : null,
    updatedAt: this.updatedAt ? this.updatedAt.getTime() : null
  };
};

userSchema.methods.toPublicJSON = function () {
  return {
    userId: this.id,
    email: this.email,
    role: this.role,
    language: this.language,
    currency: this.currency,
    wishList: this.wishList,
  };
};

module.exports = mongoose.model('User', userSchema);
