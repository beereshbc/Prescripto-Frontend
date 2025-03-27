import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");

    if (doctors) {
      res.json({ success: true, doctors });
    } else {
      res.json({ success: false, message: "Doctors not found" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailability, doctorList };
