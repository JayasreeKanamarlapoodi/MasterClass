import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InactivityPopup from "../InactivityPopup";
import { useDispatch, useSelector } from "react-redux";
import { onInitalLoad, userRegisteration } from "../../redux/userRedux/RegisterAction";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const RegistrationStatus = useSelector((state) => state.user.UserAuth);
  const Message = useSelector((state) => state.user.Message); 

  useEffect(() => {
    // console.log("intialLoad",userStatus,message);
    dispatch(onInitalLoad());
  }, []);



useEffect(() => {
//console.log("2nd useeffect",RegistrationStatus,Message);
  
  if (RegistrationStatus) {
      setUserStatus(true);
  }

  if (RegistrationStatus && Message) {
     // console.log("Successful message");
      setMessage({ type: "success", text:Message });
      navigate("/login")
  } else if (!RegistrationStatus && Message) {
     // console.log("Error message");
      setMessage({ type: "error", text:Message });
  }
}, [RegistrationStatus,Message]);

  
  
  

  

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.mobileNumber ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      setMessage({ type: "error", text: "Please enter all the details!" });
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    if (!/^\d{10}$/.test(userData.mobileNumber)) {
      setMessage({ type: "error", text: "Invalid mobile number!" });
      return;
    }

    const requestBody = {
      name: userData.name,
      mail: userData.email,
      mobile: userData.mobileNumber,
      password: userData.password,
    };

    dispatch(userRegisteration(requestBody));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white p-10 w-full max-w-2xl rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Registration
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {message.text && (
          <p className={`text-sm mt-4 text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-teal-700 text-white font-semibold py-2 rounded-md hover:bg-teal-800"
        >
          Register
        </button>

        <p className="text-sm text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
      <InactivityPopup />
    </div>
  );
};

export default Register;
