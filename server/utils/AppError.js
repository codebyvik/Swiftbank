class AppError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
    this.status = `${statuscode}`.startsWith(4) ? "fail" : "error";
    this.isOperationalError = true; // this is to check if error is thrown by us

    Error.captureStackTrace(this, this.constructor); //This shows from where the error is generated (file and line)
  }
}

module.exports = AppError;
