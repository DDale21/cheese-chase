import User from "../models/userModel.js";
import UnauthenticatedError from "../errors/UnauthenticatedError.js";

export const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new UnauthenticatedError("User already exists");
  }

  const user = await User.create({name, email, mobile, password});
  return res.status(200).json({
    success: true,
    message: "Account created successfully",
    user: user,
  })
}

