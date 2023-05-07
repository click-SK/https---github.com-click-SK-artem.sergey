import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import deliveryReducer from './delivery';

const store= configureStore({
   reducer: {
      cart:cartReducer,
      delivery: deliveryReducer,
   }
})

export default store
