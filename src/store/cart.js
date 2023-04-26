import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

const initialState = {
    items: [],
    total: 0
}

export const cartSlice= createSlice({
name:"cart",
initialState,
reducers:{
    removeCart (state, actions) {
        state.items = state.items.filter(item => item.title !== actions.payload)
    },

    removeAll (state) {
        state.items = [];
    },

    addCart (state,actions) {
        state.items.push(actions.payload)
    },

    incrementCart (state, actions) {
        state.items.map((el) => {
            if(el.title == actions.payload) {
                el.count++
            }
        })
    },

    decrementCart (state, actions) {
        state.items.map((el) => {
            if(el.title == actions.payload) {
                el.count--
                if(el.count < 1) {
                    state.items = state.items.filter(item => item.title !== actions.payload)
                }
            }
        })
    },

    changeFurniture (state, action) {
        state.items.map((el) => {
            el.colorsFurniture = [action.payload]
        })
    },

    totalSum (state) {
        state.items.map((el) => {
            state.total += el.price * el. count;
        })
    }
   }
})

export const {removeCart, removeAll, addCart, incrementCart, decrementCart, totalSum, changeFurniture} = cartSlice.actions;
export default cartSlice.reducer;