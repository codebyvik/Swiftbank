const sendErrorDevelopment = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const sendErrorProduction = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  console.log(status, message, stack);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
const globalErrorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDevelopment(err, res);
  } else {
    sendErrorProduction(err, res);
  }
};

module.exports = globalErrorController;
