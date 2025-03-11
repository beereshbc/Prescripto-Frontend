import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

//API endpoints

const addDoctors = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experiance,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experiance ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email address" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter the strong password" });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    //Image upload to cloudinary DB
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
  } catch (error) {}
};

export { addDoctors };
