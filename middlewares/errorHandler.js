const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error details

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
