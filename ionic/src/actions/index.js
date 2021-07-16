import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignUp = createAsyncThunk(
  "client/create",
  async ({ userName, userPhoneNumber, userCity }) => {
    return axios
      .post("http://localhost:3001/C/userSignUp", {
        name: userName,
        phoneNumber: userPhoneNumber,
        city: userCity,
      })
      .then((res) => {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userPhoneNumber", userPhoneNumber);
        localStorage.setItem("userCity", userCity);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        return { name: userName, phoneNumber: userPhoneNumber, city: userCity };
      });
  }
);

export const userSignIn = createAsyncThunk(
  "client/SignIn",
  async ({ loginNumber }) => {
    return axios
      .post("http://localhost:3001/C/userSignIn", { loginNumber })
      .then((res) => {
        localStorage.setItem("token", res.data.session.token);
        localStorage.setItem("userId", res.data.session.userId);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("userPhoneNumber", res.data.user.phoneNumber);
        localStorage.setItem("accountType", res.data.user.accountType);
        return {
          loginNumber,
          name: res.data.user.name,
          userId: res.data.session.userId,
          token: res.data.session.token,
          userCity: res.data.user.city,
        };
      });
  }
);
