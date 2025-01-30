export class ApiError extends Error {
  statusCode;

  constructor(statusCode, message) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }

  static NotFound(message) {
    return new ApiError(404, `Not Found: ${message}`);
  }

  static BadRequest(message) {
    return new ApiError(400, `BadRequest: ${message}`);
  }

  static Unauthorized() {
    return new ApiError(401, "Unauthorized");
  }

  static Forbidden() {
    return new ApiError(403, "Forbidden");
  }
}
