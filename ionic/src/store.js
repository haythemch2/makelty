import { configureStore } from '@reduxjs/toolkit'
import RestaurantsReducer from './Slices/RestaurantsSlice'
import CartReducer from './Slices/CartSlice'
import ClientReducer from './Slices/ClientSlice'
import AdminReducer from './Slices/AdminSlice'
import DeliveryReducer from './Slices/DeliverySlice'
export default configureStore({
  reducer: {
      Restaurant:RestaurantsReducer,
      Cart:CartReducer,
      Client:ClientReducer,
      Admin:AdminReducer,
      Delivery:DeliveryReducer
  },
})