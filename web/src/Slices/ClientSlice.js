import { createSlice } from "@reduxjs/toolkit";
import { userSignUp, userSignIn } from "./../actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ClientSlice = createSlice({
  name: "client",
  initialState: {
    client: { lat: 33.853204, lng: 10.102816 },
    orders: [],
  },
  reducers: {
    addgps: (state, action) => {
      state.client = action.payload;
    },
    addUserData: (state, action) => {
      state.client["name"] = action.payload.name;
      state.client["phoneNumber"] = action.payload.phoneNumber;
    },
    restoreSession: (state, action) => {
      state.client["token"] = action.payload.token;
    },
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    // doneTask: (state,action) => {
    //   const item = state.todolist.findIndex(el=>el.id===action.payload.id);
    //   state.todolist[item].isDone=action.payload.isDone;
    // },
    // editTask: (state,action) => {
    //   const item = state.todolist.findIndex(el=>el.id===action.payload.id);
    //   state.todolist[item].description=action.payload.description;
    //   }
  },
  extraReducers: {
    [userSignUp.fulfilled]: (state, action) => {
      state.client["name"] = action.payload.name;
      state.client["phoneNumber"] = action.payload.phoneNumber;
    },
    [userSignUp.rejected]: (state, action) => {
      MySwal.fire({
        icon: "error",
        title: `signup rejected`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    [userSignIn.fulfilled]: (state, action) => {
      state.client["name"] = action.payload.name;
      state.client["phoneNumber"] = action.payload.loginNumber;
      state.client["useId"] = action.payload.userId;
      state.client["city"] = action.payload.userCity;
      state.client["token"] = action.payload.token;
    },
    [userSignIn.rejected]: (state, action) => {
      MySwal.fire({
        icon: "error",
        title: `unvalid cordentials`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});

export const { addgps, addUserData, restoreSession, addOrder } =
  ClientSlice.actions;

export default ClientSlice.reducer;
// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // // Still pass action objects to `dispatch`, but they're created for us
// // store.dispatch(incremented())
// // // {value: 1}
// // store.dispatch(incremented())
// // // {value: 2}
// // store.dispatch(decremented())
// // // {value: 1}
