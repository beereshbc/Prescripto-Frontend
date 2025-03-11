import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// config
const app = express();
const port = process.env.PORT || 4000;
await connectDB();
await connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//API Endpoints
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API is working..");
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
