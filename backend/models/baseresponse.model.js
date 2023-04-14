class BaseResponse {
    constructor(success, statusCode, message, data) {
      this.success = success;
      this.statusCode = statusCode
      this.message = message;
      this.data = data;
    }
}

class BaseError extends Error {
    constructor(message, statusCode, description) {
      super();
      this.name = this.constructor.name;
      this.message = message || "Something went wrong. Please try again.";
      this.statusCode = statusCode || 500;
      this.description = description || "";
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseError;
module.exports = BaseResponse;