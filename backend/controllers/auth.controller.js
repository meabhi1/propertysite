const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

const register = async (req, res) => {

  try {

  const {
  fullname,
  email,
  phoneNumber,
  password,
} = req.body;

    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN =================

const login = async (req, res) => {

  try {

    const {
      email,
      password,
      role,
    } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (
      role &&
      user.role &&
      role !== user.role
    ) {

      return res.status(400).json({
        success: false,
        message: "Role mismatch",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber:
        user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message:
        `Welcome back ${user.fullname}`,
      token,
      user: userData,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGOUT =================

const logout = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET PROFILE =================

const getProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE PROFILE =================

const update = async (req, res) => {

  try {

    const {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
    } = req.body;

    const userId = req.id;

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber =
      phoneNumber;

    if (!user.profile) {
      user.profile = {};
    }

    user.profile.bio = bio;

    user.profile.skills =
      skills
        ?.split(",")
        .map((s) => s.trim()) || [];

    if (req.file) {

      user.profile.resume =
        req.file.path;

      user.profile.resumeOriginalName =
        req.file.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= EXPORTS =================

module.exports = {
  register,
  login,
  logout,
  update,
  getProfile,
};