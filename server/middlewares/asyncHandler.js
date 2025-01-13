// asyncHandler.js - A wrapper to handle async errors automatically

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Pass errors to the next middleware (error handler)
  };
};

module.exports = asyncHandler;
