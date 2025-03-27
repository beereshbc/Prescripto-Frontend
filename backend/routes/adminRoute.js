import express from "express";
import upload from "../middlewares/multer.js";
import {
  addDoctors,
  adminLogin,
  allDoctors,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorControllers.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctors);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailability);

export default adminRouter;
