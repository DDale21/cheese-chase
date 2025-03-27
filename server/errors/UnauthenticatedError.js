import CustomError from "./CustomError.js";

export default class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}