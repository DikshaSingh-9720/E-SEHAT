const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      isVerified: true
    });

    await user.save();

    // ✅ Auto-login: generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.otpLogin = async (req, res) => {
  const { phone } = req.body;

  try {
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, isVerified: true });
      await user.save();
    }
    res.status(200).json({ message: 'OTP login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, role: user.role, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};