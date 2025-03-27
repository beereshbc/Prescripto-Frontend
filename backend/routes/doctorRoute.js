import express from "express";
import { doctorList } from "../controllers/doctorControllers.js";

const doctorRouter = express.Router();

doctorRouter.post("/list", doctorList);

export default doctorRouter;
