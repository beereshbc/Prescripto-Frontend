import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AddDoctor = () => {
  const [imgDoc, setImgDoc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experiance, setExperiance] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!imgDoc) {
        return toast.error("Image not selected");
      }

      const formdata = new FormData();

      formdata.append("image", imgDoc);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("experiance", experiance);
      formdata.append("fees", Number(fees));
      formdata.append("speciality", speciality);
      formdata.append("degree", degree);
      formdata.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formdata.append("about", about);

      // formdata.forEach((key, value) => {
      //   console.log(value + ":" + key);
      // });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formdata,
        { headers: { aToken } }
      );
      console.log(aToken);

      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          window.location.href = "/add-doctor";
        }, 2000);

        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full m-5">
      <p className="mb-3 text-lg font-medium ">New Doctor</p>
      <div className="bg-white  mx-8 my-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex text-gray-600 gap-4 items-center m-5 ">
          <label htmlFor="id-img">
            <img
              className="w-16 cursor-pointer md:w-20"
              src={imgDoc ? URL.createObjectURL(imgDoc) : assets.upload_area}
              alt=""
            />
          </label>
          <p>
            Upload doctor <br /> picture
          </p>
          <input
            onChange={(e) => setImgDoc(e.target.files[0])}
            type="file"
            hidden
            id="id-img"
          />
        </div>

        <div className=" flex-col flex-1 md:flex-row mx-10 justify-between grid gap-4 grid-cols-2">
          <div className="flex-col gap-y-3 ">
            <div className="flex flex-1 flex-col gap-1 mb-3">
              <p className="text-gray-600">Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="outline-none w-full border p-2 rounded"
                type="text"
                placeholder="Doctor name"
                required
              />
            </div>
            <div className="flex flex-1 flex-col gap-1  mb-3">
              <p className="text-gray-600">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none w-full border p-2 rounded"
                type="email"
                placeholder="Doctor Email"
                required
              />
            </div>
            <div className="flex flex-1 flex-col gap-1  mb-3">
              <p className="text-gray-600">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none w-full border p-2 rounded"
                type="password"
                placeholder="Doctor Password"
                required
              />
            </div>
            <div className="flex flex-1 flex-col gap-1  mb-3">
              <p className="text-gray-600">Experience</p>
              <select
                onChange={(e) => setExperiance(e.target.value)}
                value={experiance}
                className="outline-none w-full border p-2 rounded"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1  mb-3">
              <p className="text-gray-600">Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="outline-none w-full border p-2 rounded"
                type="number"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex-1">
              <div className="flex flex-1 flex-col gap-1  mb-3">
                <p className="text-gray-600">Speciality</p>
                <input
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  className="outline-none w-full border p-2 rounded"
                  type="text"
                  placeholder="Speciality"
                  required
                />
              </div>
              <div className="flex flex-1 flex-col gap-1  mb-3">
                <p className="text-gray-600">Education</p>
                <input
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  className="outline-none w-full border p-2 rounded"
                  type="text"
                  placeholder="Education"
                  required
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-gray-600">Address</p>
                <input
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                  className="outline-none w-full border p-2 rounded"
                  type="text"
                  placeholder="Address Line-1"
                  required
                />
                <input
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                  className="outline-none w-full border p-2 rounded"
                  type="text"
                  placeholder="Address Line-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1   mx-9 my-8 ">
          <div>
            <p className="m-3 text-lg font-medium">About me</p>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="outline-none  w-full border p-2 rounded"
              placeholder="Write about you..!"
            ></textarea>
          </div>
        </div>
      </div>
      <button className="px-10 py-2 border bg-primary hover:scale-105 transition-all duration-300 text-white rounded-full ml-10 ">
        Submit
      </button>
    </form>
  );
};

export default AddDoctor;
