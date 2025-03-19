import CustomError from "../errors/CustomError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later",
  });
}

export default errorHandlerMiddleware;