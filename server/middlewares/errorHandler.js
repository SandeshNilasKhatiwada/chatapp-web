// errorHandler.js - Global error handler to format error responses

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode provided
  const message = err.message || 'Something went wrong!';

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Show stack trace in development
  });
};

module.exports = errorHandler;
