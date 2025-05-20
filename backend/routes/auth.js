const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @route POST /api/auth/forgot-password
 * @desc Request password reset (send email)
 * @access Public
 */
router.post('/forgot-password', authController.requestPasswordReset);

/**
 * @route POST /api/auth/reset-password/:token
 * @desc Reset password with token
 * @access Public
 */
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;