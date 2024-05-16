import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    //! we are using error handler middleware instance of this
    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Email or password",
    //   });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    // if (user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User already Exist",
    //   });

    if (user) return next(new ErrorHandler("user already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error)
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:  process.env.NODE_ENV==="Development" ? "lax" : "none" ,
      secure: process.env.NODE_ENV==="Development" ? false :true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

//? we are not using this update and delete user functionality in our todo app

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     message: "updated",
//   });
// };

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   await user.deleteOne()

//   res.json({
//     success: true,
//     message: "deleted",
//   });
// };
