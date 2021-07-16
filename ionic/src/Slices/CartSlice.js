import { createSlice } from '@reduxjs/toolkit'



const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart:[]
  },
  reducers: {
    additem: (state,action) => {
      state.cart=[...state.cart,action.payload]
    },
    deleteitem: (state,action) => {
       state.cart =state.cart.filter(el=>el.id!==action.payload.id)
      },
    // doneTask: (state,action) => {
    //   const item = state.todolist.findIndex(el=>el.id===action.payload.id);
    //   state.todolist[item].isDone=action.payload.isDone;
    // },
    // editTask: (state,action) => {
    //   const item = state.todolist.findIndex(el=>el.id===action.payload.id);
    //   state.todolist[item].description=action.payload.description;
    //   }
}
})

export const {additem,deleteitem} = CartSlice.actions

export default CartSlice.reducer
// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // // Still pass action objects to `dispatch`, but they're created for us
// // store.dispatch(incremented())
// // // {value: 1}
// // store.dispatch(incremented())
// // // {value: 2}
// // store.dispatch(decremented())
// // // {value: 1}