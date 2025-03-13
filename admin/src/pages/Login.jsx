import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setAToken, aToken } = useContext(AdminContext);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={submitHandler} className="flex max-w-80vh sm:mx-10px">
      <div className="flex flex-col gap-2 items-start m-auto border shadow-lg p-12 align-middle min-w-80  sm:min-w-[430px] my-28">
        <p className="font-medium text-2xl">
          <span className="text-primary">{state} </span>
          Login
        </p>
        <div className=" w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full p-1 outline-none border rounded py-1 my-1"
            type="text"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1 outline-none border rounded py-1 my-1"
            type="text"
          />
        </div>
        <button className="w-full bg-primary p-2 text-white font-medium rounded">
          Submit
        </button>
        <div>
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-primary underline cursor-pointer select-none"
                onClick={() => setState("Doctor")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-primary underline cursor-pointer select-none"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
