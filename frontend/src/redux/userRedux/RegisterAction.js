import * as requestFromServer from "./RegisterCrud";
import { registerInitialLoad,userRegistered, registrationFailed,loginVerified, loginVerificationFailed} from "./RegisterSlice";

export const onInitalLoad=()=>async(dispatch)=>{
  dispatch(registerInitialLoad())
}

export const userRegisteration = (userData) => async (dispatch) => {
  console.log("user data action", userData);
  try {
    const response = await requestFromServer.userRegisteration(userData);
    console.log("response", response.data.user);
    dispatch(userRegistered(response.data.message));
  } catch (error) {
    console.log("error in posting data");
    dispatch(registrationFailed("User already exists! Please log in instead."));
  }
};

export const userLoginVerification=(userData)=>async(dispatch)=>
{
  let response;
  try {
   response = await requestFromServer.userLoginVerification(userData);
    console.log("response", response);
    dispatch(loginVerified(response.data.message));
  } catch (error) {
    console.log("Error in posting data:", error);

    if (error.response) {
        console.log("Server responded with:", error.response.data);
       dispatch(loginVerificationFailed(error.response.data.message))
    } else if (error.request) {
        console.log("No response received. Request details:", error.request);
    } else {
        console.log("Error setting up the request:", error.message);
    }
}
}
