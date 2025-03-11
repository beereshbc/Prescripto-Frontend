import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctors } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.single("image"), addDoctors);

export default adminRouter;
