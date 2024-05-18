const catchAsyncError = (fnctn) => {
  const errorHandler = (req, res, next) => {
    fnctn(req, res, next).catch(next);
  };

  return errorHandler;
};

module.exports = catchAsyncError;
