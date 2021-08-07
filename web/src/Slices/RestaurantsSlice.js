import { createSlice } from '@reduxjs/toolkit'



const RestaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    menu:{},
    orders:[],
    orderitems:[],
    restaurants:{}
  },
  reducers: {
    storerestaurants: (state,action) => {
      state.restaurants=action.payload
    },
    storeMenuItems: (state,action) => {
      state.menu=action.payload
    },
    setOrderItems:(state,action)=>{
      state.orderitems=action.payload
    },
    setOrders:(state,action)=>{
      state.orders=action.payload
    },
    addOrder: (state,action) => {
       state.orders=[...state.orders,action.payload]
      },
    editActive: (state,action) => {
        state.restaurants[action.payload.id].active= action.payload.active
      }
}
})

export const {storerestaurants, storeMenuItems, setOrderItems, editActive,addOrder,setOrders} = RestaurantsSlice.actions

export default RestaurantsSlice.reducer
// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // // Still pass action objects to `dispatch`, but they're created for us
// // store.dispatch(incremented())
// // // {value: 1}
// // store.dispatch(incremented())
// // // {value: 2}
// // store.dispatch(decremented())
// // // {value: 1}

