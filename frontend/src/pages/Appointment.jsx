import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ReleatedDocters from "../components/ReleatedDocters";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const fetchAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // get date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // set endTime by geting Date with Date index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slots to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increament current time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    fetchAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="flex flex-col mb-20">
        {/* --------- Doctors info -------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full bg-primary sm:max-w-72 rounded-lg ">
            <img src={docInfo.image} alt="" />
          </div>
          <div className="flex-1 border border-gray-400 p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0 bg-white rounded-lg">
            <p className="flex items-center text-2xl text-gray-800 gap-2 font-medium">
              {docInfo.name}{" "}
              <img className="w-4" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div className=" max-w-[700px]">
              <p className="flex items-center text-xl text-gray-700 font-medium gap-1 mt-2">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-gray-500 text-sm leading-5">{docInfo.about}</p>
            </div>
            <p className="text-md text-gray-700 mt-2 font-medium">
              Appointment fee :
              <span className="text-gray-900 ">
                {currency}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---------- BOOKING SLOTS ---------- */}

        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-4">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center overflow-x-scroll w-full mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 border border-gray-200 cursor-pointer rounded-full min-w-16 ${
                    slotIndex === index ? "bg-primary text-white" : ""
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex overflow-x-scroll mt-4 p-4 gap-5 w-full items-center text-center ">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <div
                  className={`text-sm px-5 py-2 font-light cursor-pointer flex-shrink-0 rounded-full ${
                    item.time === slotTime
                      ? "bg-primary text-white "
                      : "border text-gray-500 border-gray-300"
                  }`}
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                >
                  <p>{item.time}</p>
                </div>
              ))}
          </div>
          <button className="bg-primary text-white px-14 text-sm font-light py-3 rounded-full my-6 hover:scale-105 transition-all duration-300">
            Book an appointment
          </button>
        </div>

        {/* Releated Docters */}
        <ReleatedDocters speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
};

export default Appointment;
