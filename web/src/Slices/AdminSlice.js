import { createSlice } from '@reduxjs/toolkit'



const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    orders:[]
  },
  reducers: {
    addOrders: (state,action) => {
     state.orders=action.payload
    },
    addOrder: (state,action)=>{
      state.orders=[...state.orders,action.payload]
    }
}
})

export const {addOrders,addOrder} = AdminSlice.actions

export default AdminSlice.reducer