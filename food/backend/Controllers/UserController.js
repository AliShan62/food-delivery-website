const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// Rest of the code in UserController.js

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, location } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email address is already registered',
      });
    }

    // Generating salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      location
    });

    // Send a success response with a success message
    return res.status(200).json({
      success: true,  
      message: 'Registration successful. Welcome to our website!',
      user,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
    });
  }
};


// Here is login function
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: 'Invalid Email',
      });
    }

    // Compare the plain text password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        errors: 'Invalid Password',
      }); 
    }

    // Password is valid, user is authenticated
    // Generate a token for the user
    const secretKey = 'your-secret-key'; // Replace this with your own secret key
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: '1h', // Token expiration time (optional)
    });

    // Include the token in the response
    return res.json({ success: true, user, token });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Failed to login',
    });
  }
};



