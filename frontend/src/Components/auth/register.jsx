import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

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

    // Validate Confirm Password
    if (userData.password !== userData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    // Validate Mobile Number (basic check)
    if (!/^\d{10}$/.test(userData.mobileNumber)) {
      setMessage({ type: "error", text: "Invalid mobile number!" });
      return;
    }

    console.log("Submitting Registration Data:", userData);

    try {
      const requestBody = {
        name: userData.name,
        mail: userData.email,
        mobile: userData.mobileNumber,
        password: userData.password,
      };

      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setMessage({ type: "success", text: result.message });
        setUserData({ name: "", email: "", mobileNumber: "", password: "", confirmPassword: "" });
      } else {
        throw new Error(result.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Invalid mobile number!" });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Validate Required Fields
  //   if (!userData.name || !userData.email || !userData.mobileNumber) {
  //     setMessage({ type: "error", text: "Please enter all the details!" });
  //     return;
  //   }
  
  //   // Validate Mobile Number (basic check)
  //   if (!/^\d{10}$/.test(userData.mobileNumber)) {
  //     setMessage({ type: "error", text: "Invalid mobile number!" });
  //     return;
  //   }
  
  //   console.log("Submitting Registration Data:", userData);
  
  //   const data = {
  //     name: userData.name,
  //     email: userData.email,
  //     mobileNumber: userData.mobileNumber,
  //   };
  
  //   try {
  //     const response = await fetch(
  //       "https://script.google.com/macros/s/AKfycbwlIvyWpgPE5bY_l3zrOO-DCvJ-Iu20dnEp-b8AouvjDAvMOWuZ0XuVYa2Ln9NQzSM/exec",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //         mode: "cors", // Allow CORS
  //       }
  //     );
  
  //     console.log("Response Status:", response.status);
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
  //     }
  
  //     const responseData = await response.json();
  //     console.log("Response Data:", responseData);
  
  //     setMessage({ type: "success", text: "Registration successful!" });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessage({ type: "error", text: "Failed to register. Please try again." });
  //   }
  // };
  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="bg-white p-10 w-full max-w-2xl rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Registration
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
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

          {/* Email */}
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

          {/* Mobile Number */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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

        {/* Error / Success Message */}
        {message.text && (
          <p className={`text-sm mt-4 text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        )}

        {/* Submit Button */}
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
    </div>
  );
};

export default Register;
