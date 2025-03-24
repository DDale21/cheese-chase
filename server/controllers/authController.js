import User from "../models/userModel";

export const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const user = await User.create({name, email, mobile, password});
  return res.status(200).json({
    success: true,
    message: "Account created successfully",
    user: user,
  })
}

