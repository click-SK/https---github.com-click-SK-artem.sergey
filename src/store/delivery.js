import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deliveryFirstName: '',
    deliveryLastName: '',
    deliverySurName: '',
    deliveryNumberPhone: '',
    deliveryOrderComent: '',
    deliveryDistance: '',
    deliveryAdress: '',
    deliveryBoolean: false
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
    setDistanceFunc(state, actions) {
        state.deliveryDistance = actions.payload;
    },
    setAdressFunc(state, actions) {
        state.deliveryAdress = actions.payload;
    },
    setBooleanFunc(state, actions) {
        state.deliveryBoolean = !state.deliveryBoolean;
    },
   }
})

export const {setFirstNameFunc, setLastNameFunc, setSurNameFunc, setOrderComentFunc, setNumberPhoneFunc, setDistanceFunc, setAdressFunc, setBooleanFunc} = deliverySlice.actions;
export default deliverySlice.reducer;