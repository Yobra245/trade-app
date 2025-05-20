const express = require('express');
const { register, login, getUsers, requestPasswordReset, resetPassword } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { body } = require('express-validator');
const router = express.Router();

// Registration route
router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  register
);

// Login route
router.post('/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

// Protected users route (admin only)
router.get('/users', auth, role('admin'), getUsers);

// Request password reset
router.post('/request-password-reset',
  body('email').isEmail().withMessage('Email is invalid'),
  requestPasswordReset
);

// Reset password
router.post('/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  resetPassword
);

module.exports = router;