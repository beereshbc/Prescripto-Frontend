import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/get-profile", userAuth, getProfile);
userRouter.post(
  "/update-profile",
  userAuth,
  upload.single("image"),
  updateProfile
);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, listAppointment);
userRouter.post("/cancel-appointment", userAuth, cancelAppointment);
userRouter.post("/payment-razorpay", userAuth, paymentRazorpay);
userRouter.post("/verifyRazorpay", userAuth, verifyRazorpay);

export default userRouter;
