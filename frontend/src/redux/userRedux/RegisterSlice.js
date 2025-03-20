import { createSlice } from '@reduxjs/toolkit';


export const initialUserValidationState={
  UserAuth: false,
  validMobileNumber:false,
  otp:null,
  otpVerified:false,
  loginVerified:false,
  userid:null,
  username:null,
  usermail:null,
  userPhoneNumber:null,
  Message:null
}

const userRegisterSlice = createSlice({
  name: 'user',
  initialState: initialUserValidationState,
  reducers: { 
    registerInitialLoad:(state,action)=>{
      state.UserAuth=false;
      state.loginVerified=false;
      state.Message=null;
    },
    userRegistered: (state, action) => {
      console.log("Action payload", action.payload);
      state.UserAuth = true;
      state.Message = action.payload; // Fix: directly store the message
    },
    registrationFailed: (state, action) => {
      console.log(action.payload)
      state.UserAuth = false;
      state.Message = action.payload; // Store the error message
    },
    loginVerified:(state,action)=>{
      console.log(action.payload)
      state.loginVerified=true;
      state.Message=action.payload;
    },
    loginVerificationFailed:(state,action)=>{
      console.log(action.payload)
      state.loginVerified=false;
      state.Message=action.payload;
    }
 
},
});

export const {registerInitialLoad,userRegistered,registrationFailed,loginVerified,loginVerificationFailed} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
