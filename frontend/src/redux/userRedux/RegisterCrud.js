
import axios from "axios";

export const userRegisteration= async (userData)=>{
    console.log("crud user data",userData);
    return await axios.post("http://localhost:6001/api/users",userData);
}

export const userLoginVerification=async(userData)=>{
    console.log("crud user data",userData);
    return await axios.post("http://localhost:6001/api/validateusers",userData);
}