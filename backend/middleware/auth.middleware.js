const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token =
      authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    // IMPORTANT
    req.id = decoded.userId;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};