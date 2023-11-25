const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { required: false, type: String, unique: false },
    email: { required: true, type: String, unique: true },
    mobile: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
