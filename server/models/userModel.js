import dotenv from "dotenv"
dotenv.config();
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
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  mobile: {
    type: Number,
    required: [true, "Please provide your mobile number"]
  }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
  
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

// TODO Token
userSchema.methods.generateToken = async function () {
  const user = {
    id: this._id,
    name: this.name
  }
  const token = jwt.sign(
    user,
    process.env.JWT_SECRET,

  );
}

userSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password);
  return isMatched;
}

const User = mongoose.model("User", userSchema);
export default User;