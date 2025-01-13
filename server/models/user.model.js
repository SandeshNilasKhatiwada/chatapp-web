const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    profile: { type: String },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true }, // This field will have a unique index
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
