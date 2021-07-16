import { createSlice } from '@reduxjs/toolkit'



const DeliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    orders:{}
  },
  reducers: {
    setorder: (state,action) => {
      state.orders=action.payload
    },
   
}
})

export const {setorder} = DeliverySlice.actions

export default DeliverySlice.reducer
