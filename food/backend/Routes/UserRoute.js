const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require("../Controllers/UserController");
//const { MyOrder } = require("../Controllers/OrderData");
const { body } = require('express-validator');

router.post("/register", [
  body('name', 'Enter Your Correct Name').isLength({ min: 2 }),
  body('email', 'Enter Your Correct Email').isEmail(),
  body('password', 'Password Should be 8 Characters').isLength({ min: 8 })
], registerUser);

router.post("/login", [
  body('email', 'Enter Your Correct Email').isEmail(),
  body('password', 'Password Should be 8 Characters').isLength({ min: 8 })
], loginUser);



module.exports = router;
