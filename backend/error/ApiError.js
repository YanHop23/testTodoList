class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(error) {
        return new ApiError(400, error);
    }

    static internal(error) {
        return new ApiError(500, error);
    }

    static forbidden(error) {
        return new ApiError(403, error);
    }
}

export default ApiError;