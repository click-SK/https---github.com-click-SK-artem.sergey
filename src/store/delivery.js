import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryFirstName: '',
    deliveryLastName: '',
    deliverySurName: '',
    deliveryNumberPhone: '',
    deliveryOrderComent: '',
}

export const deliverySlice= createSlice({
name:"cart",
initialState,
reducers:{
    setFirstNameFunc(state, actions) {
        state.deliveryFirstName = actions.payload;
    },
    setLastNameFunc(state, actions) {
        state.deliveryLastName = actions.payload;
    },
    setSurNameFunc(state, actions) {
        state.deliverySurName = actions.payload;
    },
    setNumberPhoneFunc(state, actions) {
        state.deliveryNumberPhone = actions.payload;
    },
    setOrderComentFunc(state, actions) {
        state.deliveryOrderComent = actions.payload;
    },
   }
})

export const {setFirstNameFunc, setLastNameFunc, setSurNameFunc, setOrderComentFunc, setNumberPhoneFunc} = deliverySlice.actions;
export default deliverySlice.reducer;