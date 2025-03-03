import React, { useState } from "react";
import { assets } from "../assets/assets";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    image: assets.profile_pic,
    name: "Edward Vincent",
    email: "richardjameswap@gmail.com",
    phone: "+1  123 456 7890",
    address: {
      line1: "57th Cross, Richmond ",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "20 July, 2024",
  });
  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="fles flex-col max-w-lg gap-2 text-sm">
      <img className="w-36 rounded" src={userData.image} alt="" />
      {isEdit ? (
        <input
          className="bg-indigo-50 text-3xl font-medium max-w-60 mt-4 p-1 rounded"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className=" text-3xl font-medium max-w-60 mt-4 p-1 rounded">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-500 h-[1.5px] my-4 border-none" />
      <div className="text-sm text-gray-700 gap-2">
        <p className="text-neutral-500 underline mt-4 pb-1">
          CONTACT INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-600">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-indigo-50 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-600">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="bg-indigo-50"
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                className="bg-indigo-50"
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-700">{userData.address.line1}</p>

              <p className="text-gray-700">{userData.address.line2}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-4 pb-1">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_2fr] gap-2 mt-3 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-indigo-50"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-indigo-50"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>
      <div>
        {isEdit ? (
          <button
            className="border px-8 py-2 text-sm text-black border-gray-800 mt-3 hover:bg-primary hover:text-white transition-all duration-300 rounded"
            onClick={() => setIsEdit(false)}
          >
            Save information
          </button>
        ) : (
          <button
            className="border px-8 py-2 text-sm text-black border-gray-800 mt-3 hover:bg-primary hover:text-white transition-all duration-300 rounded"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
