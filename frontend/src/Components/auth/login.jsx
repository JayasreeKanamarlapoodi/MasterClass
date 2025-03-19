import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.emailOrMobile ||
      !userData.password
    ) {
      setMessage({ type: "error", text: "Please enter all the details!" });
      return;
    }

    console.log("Submitting Login Data:", userData);

    try {
      const requestBody = {
        mobile: userData.emailOrMobile,
        mail: userData.emailOrMobile, // Ensure API expects this
        password: userData.password,
      };

      const response = await fetch("http://localhost:5001/api/validateusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Server Response:", result);
      if(!response.ok){
        setMessage({ type: "error", text: result.message});
      }

      if (response.ok) {
        localStorage.setItem("Cricket-user", JSON.stringify(result));
        navigate("/landing");
        setUserData({ emailOrMobile: "", password: "" });
        setMessage({ type: "success", text: result.message});
      } else {
        throw new Error(`Server Error: ${response.status} ${result.message || "Unknown Error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form className="bg-white p-10 w-full max-w-md rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Email or Mobile Number
            </label>
            <input
              type="text"
              name="emailOrMobile"
              value={userData.emailOrMobile}
              onChange={handleChange}
              placeholder="Enter your email or mobile number"
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
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
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

         {/* Error / Success Message */}
         {message.text && (
          <p className={`text-sm mt-4 text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full  bg-teal-700 text-white font-semibold py-2 rounded-md hover:bg-teal-800"
        >
          Login
        </button>

        <p className="text-sm text-gray-700 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
