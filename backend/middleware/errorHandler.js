const winston = require('winston');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  winston.error(err.stack);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? (status === 500 ? 'Internal Server Error' : err.message)
    : err.message;
  res.status(status).json({ message });
};

module.exports = errorHandler;
// Basic error handler for Express
module.exports = (err, req, res, next) => {
  console.error(err.stack || err.message || err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};