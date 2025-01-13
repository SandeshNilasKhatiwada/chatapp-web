// errorHandler.js - Global error handler to format error responses
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Handle Mongoose validation errors (e.g. from Joi or Mongoose schema validation)
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: formatMongooseValidationErrors(err.errors), // Format validation errors
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }

  // Handle Mongoose duplicate key errors (e.g. trying to insert a duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Get the field name causing the duplicate error
    return res.status(400).json({
      success: false,
      message: `Duplicate value error: ${field} already exists`,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }

  // Handle other types of Mongoose errors (e.g. cast errors)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field: ${err.path}`,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }

  // Handle any other errors
  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode provided
  const message = err.message || 'Something went wrong!';

  // Send general error response
  return res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Show stack trace in development
  });
};

// Helper function to format Mongoose validation errors
const formatMongooseValidationErrors = (errors) => {
  return Object.values(errors).map((error) => ({
    message: error.message,
    path: error.path,
  }));
};

module.exports = errorHandler;
