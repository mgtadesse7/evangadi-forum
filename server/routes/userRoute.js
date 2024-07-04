const express = require("express");
const router = express.Router();

//Authentication middleware
const authMiddleware = require("../middleware/authMiddleware.js");

// User controllers
const { register, login, checkUser } = require("../controller/userController");

// Register route
router.post("/register", register);

// Login user
router.post("/login", login);

// Check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
