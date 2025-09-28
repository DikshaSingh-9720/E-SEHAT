const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  password: String,
  phone: { type: String, unique: true },
  address: String,
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);