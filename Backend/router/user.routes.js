const express = require('express')
const router = require('express').Router();
const authController = require('../controllers/authController');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// User logout route (optional for JWTs)
router.post('/logout', authController.logout);

module.exports = router;