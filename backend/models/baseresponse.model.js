class BaseResponse {
    constructor(success, statusCode, message, data) {
      this.success = success;
      this.statusCode = statusCode
      this.message = message;
      this.data = data;
    }

    static success(data) {
        return new BaseResponse(true, 200, "Request successful", data);
    }

    static created(data) {
        return new BaseResponse(true, 201, "Request successful", data);
    }

    static nocontent(data) {
        return new BaseResponse(true, 204, "Request successful", data);
    }

    static deleted(data) {
        return new BaseResponse(true, 204, "Request successful", data);
    }

    static error(statusCode, message, data) {
        Error.captureStackTrace(this, this.constructor);
        return new BaseResponse(false, statusCode, message, data);
    }
}

module.exports = BaseResponse;