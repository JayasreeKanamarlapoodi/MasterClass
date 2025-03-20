import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage
    sessionStorage.removeItem("token");

    // Clear Redux state (assuming a `logout` action exists)
    dispatch({ type: "LOGOUT" });

    // Redirect to home page after logout
    navigate("/");
  }, [dispatch, navigate]);

  return <p className="text-center text-red-600 mt-10">Logging out...</p>;
};

export default Logout;
