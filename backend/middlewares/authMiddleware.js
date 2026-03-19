import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, resizeBy, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.userId).select("-password");

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not Authorized" });
  }
};

export default authMiddleware;
