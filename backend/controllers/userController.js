import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ success: false, messagte: "Missing Details" });
    }
    if (!validator.isEmail) {
      res.json({ success: false, messagte: "Enter Valid Email " });
    }

    if (password.lenght > 8) {
      res.json({ success: false, messagte: "Enter strong Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = userModel(userData);
    const user = await newUser.save();
    res.json({ success: true, message: "Register succussfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { registerUser };
