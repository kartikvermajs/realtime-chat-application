import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateUniqueConnectCode from "../utils/generateUniqueConnectCode.js";

class AuthController {
  static async register(req, res) {
    try {
      const { fullName, username, email, password } = req.body;

      if (!fullName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with username or email" });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, slat);

      const user = new User({
        username,
        fullName,
        email,
        password: hashedPassword,
        connectCode: await generateUniqueConnectCode(),
      });

      await user.save();
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Registration error", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
