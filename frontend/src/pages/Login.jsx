import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { backendUrl, setToken, token } = useContext(AppContext);

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          email,
          password,
          name,
        });

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
    console.log(event.target.name);
  };

  // useState(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 2000);
  //   if (token) {

  //   }
  // }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="flex min-h-[80vh] items-center flex-wrap max-h-screen overflow-auto mx-auto max-w-[60vh]"
    >
      <div className="border min-w-[40vh] border-gray-200 shadow-xl w-full items-center justify-center mx-auto p-10 bg-white rounded-lg">
        <p className="text-gray-900 font-medium text-2xl mb-1">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="mb-5 text-gray-600">
          Please {state === "Sign Up" ? "sign up" : "Login"} to book appointment
        </p>
        {state === "Sign Up" && (
          <div>
            <p className="text-sm text-gray-700">Name</p>
            <input
              className="outline-none py-2 border border-gray-500 w-full mb-5 rounded px-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div>
          <p className="text-sm text-gray-700">Email</p>
          <input
            className="outline-none py-2 border border-gray-500 w-full mb-5 rounded px-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700">Password</p>
          <input
            className="outline-none py-2 border border-gray-500 w-full mb-5 rounded px-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="outline-none py-2 bg-primary text-white border border-gray-500 w-full mb-5 rounded px-2 mt-1 hover:scale-105 transition-all duration-300">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div>
          {state === "Sign Up" ? (
            <p className="text-gray-500 text-sm">
              Already have an account?
              <span
                className="text-blue-800 cursor-pointer underline ml-2"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              Create New Account ?
              <span
                className="text-blue-800 cursor-pointer underline  ml-2"
                onClick={() => setState("Sign Up")}
              >
                SignUp
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
