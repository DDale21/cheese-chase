import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Please provide your mobile number"]
  },
  password: {
    type: String,
    required: [true, "Please provide"],
    minLength: 6,
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.methods.getName = function () {
  return this.name;
}
userSchema.methods.getEmail = function () {
  return this.email;
}
userSchema.methods.getMobile = function () {
  return this.mobile;
}

userSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password);
  return isMatched;
}

const User = mongoose.model("User", userSchema);
export default User;