import { createSlice } from '@reduxjs/toolkit'
const RestaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
     menuItem : {
        "1" : { name:'kaskrout',price:2 },
        "2" : { name:'mlawi',price:3 },
        "3"  : { name:'3ejja',price:4 },
        "4" :  { name:'ma9loub',price:5 },
        "5"  :  { name:'pizza',price:6 },
     }


     
    ,restaurants:{
     "1" :   {
          active:false,
          coordinatelatitude: 33.853507,
          coordinatelongitude: 10.102752,
          title: "Amazing Food Place",
          description: "This is the best food place",
          image: 'https://i.ibb.co/jkR8B1t/food-banner1.jpg',
          rating: 4,
          reviews: 99,
          menu:[],
          orders:[]      
        },
        "2" :   {
          active:false,
          coordinatelatitude: 33.855211,
          coordinatelongitude: 10.100513,
          title: "Second Amazing Food Place",
          description: "This is the second best food place",
          image: 'https://i.ibb.co/Pj81K5x/food-banner2.jpg',
          rating: 5,
          reviews: 102,
          menu:["1","5"],
          orders:[]      
        },
        "3" :   {
          active:false,
          coordinatelatitude: 33.850510,
          coordinatelongitude: 10.106260,
          title: "Third Amazing Food Place",
          description: "This is the third best food place",
          image: 'https://i.ibb.co/Y35BS84/food-banner3.jpg',
          rating: 3,
          reviews: 220,
          menu:["4"],
          orders:[]      
        },
        "4" :  {
          active:false,
          coordinatelatitude: 33.852487,
          coordinatelongitude: 10.104135,
          title: "Fourth Amazing Food Place",
          description: "This is the fourth best food place",
          image: 'https://i.ibb.co/QMmd3GW/food-banner4.jpg',
          rating: 4,
          reviews: 48,
          menu:["1"],
          orders:[]      
        },
        "5" : {
          active:false,
          coordinatelatitude: 33.852291,
          coordinatelongitude: 10.107314,
          title: "Fifth Amazing Food Place",
          description: "This is the fifth best food place",
          image: 'https://i.ibb.co/PcRFM9z/food-banner5.jpg',
          rating: 4,
          reviews: 178,
          menu:["4","1","2"],
          orders:[]      
        },
    }
  },
  reducers: {
    addOrder: (state,action) => {
      const Rest = state.restaurants.findIndex(el=>el.id===action.payload.id);
      state.restaurants[Rest].orders=[...state.restaurants[Rest].orders,action.payload.order];
    },
    deleteTask: (state,action) => {
       state.todolist =state.todolist.filter(el=>el.id!==action.payload.id)
      },
    doneTask: (state,action) => {
      const item = state.todolist.findIndex(el=>el.id===action.payload.id);
      state.todolist[item].isDone=action.payload.isDone;
    },
    editActive: (state,action) => {
      const Rest = state.restaurants.findIndex(el=>el.id===action.payload.id);
      state.restaurants[Rest].active=action.payload.active;
      }
}
})

export const {addOrder, deleteTask, doneTask, editActive } = RestaurantsSlice.actions

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