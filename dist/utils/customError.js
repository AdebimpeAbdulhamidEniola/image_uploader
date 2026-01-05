export class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
export class NoFileUploadedError extends AppError {
    constructor(message = "No file uploaded") {
        super(message, 400);
        Object.setPrototypeOf(this, NoFileUploadedError.prototype);
    }
}
export class ImageNotFoundError extends AppError {
    constructor(message = "Image not found") {
        super(message, 404);
        Object.setPrototypeOf(this, ImageNotFoundError.prototype);
    }
}
//# sourceMappingURL=customError.js.map