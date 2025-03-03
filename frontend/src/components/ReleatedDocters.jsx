import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ReleatedDocters = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [docData, setDocData] = useState([]);

  const ReleatedDoctorFilter = () => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setDocData(doctorData);
    }
  };

  useEffect(() => {
    ReleatedDoctorFilter();
  }, [speciality, doctors, docId]);

  return (
    <div>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 pt-5 px-3 sm:px-0">
        {docData.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-300"
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex items-center text-center text-sm gap-4 text-green-600">
                <p className="w-2 h-2 rounded-full bg-green-600"></p>
                <p className="">Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleatedDocters;
