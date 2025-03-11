import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experiance: { type: String, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    address: { type: object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: object, default: {} },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.model.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
