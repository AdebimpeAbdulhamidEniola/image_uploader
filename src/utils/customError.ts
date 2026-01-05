export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NoFileUploadedError extends AppError {
  constructor(message: string = "No file uploaded") {
    super(message, 400);
    Object.setPrototypeOf(this, NoFileUploadedError.prototype);
  }
}

export class ImageNotFoundError extends AppError {
  constructor(message: string = "Image not found") {
    super(message, 404);
    Object.setPrototypeOf(this, ImageNotFoundError.prototype);
  }
}