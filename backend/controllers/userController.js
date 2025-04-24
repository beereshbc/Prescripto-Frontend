import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, message: "Register succussfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found", user });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Authentication is failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const userData = await userModel.find({ email }.select("-password"));
      res.json({ success: true, userData });
    } else {
      res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "successfully fetched" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, dob, address, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !address || !gender) {
      return res.json({ success: false, message: "Missing details" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    return res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//

//API to book appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, agentId, slotDate, slotTime } = req.body;

    const agentData = await agentModel.findById(agentId).select("-password");

    //my-code for address check

    if (!agentData.available) {
      return res.json({
        success: false,
        message: "Service provider not Available",
      });
    }

    let slots_booked = agentData.slots_booked;

    //Checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slots not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete agentData.slots_booked;

    const appointmentData = {
      userId,
      agentId,
      userData,
      agentData,
      amount: agentData.fees,
      address: userData.address,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //Save new slots data in agentData
    await agentModel.findByIdAndUpdate(agentId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //Verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //Releasing Doctores slot after the cancellation

    const { agentId, slotDate, slotTime } = appointmentData;

    const agentData = await agentModel.findById(agentId);

    let slots_booked = agentData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await agentModel.findByIdAndUpdate(agentId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
