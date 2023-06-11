import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    copyItems: [],
    total: 0
}

export const cartSlice= createSlice({
name:"cart",
initialState,
reducers:{
    removeCart (state, actions) {
        state.items = state.items.filter(item => item.title !== actions.payload)
        state.copyItems = state.items.filter(item => item.title !== actions.payload)
    },

    removeAll (state) {
        state.items = [];
        state.copyItems = [];
    },

    addCart (state,actions) {
        state.items.push(actions.payload)
        state.copyItems.push(actions.payload)
    },

    incrementCart (state, actions) {
        state.items.map((el) => {
            if(el.title == actions.payload) {
                el.count++
            }
        })
        state.copyItems.map((el) => {
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
        state.copyItems.map((el) => {
            if(el.title == actions.payload) {
                el.count--
                if(el.count < 1) {
                    state.copyItems = state.copyItems.filter(item => item.title !== actions.payload)
                }
            }
        })
    },

    changeFurniture (state, action) {
        state.copyItems.map((el) => {
            if(el.name == action.payload.item.name) {
                el.colorsFurniture = [action.payload.selectedColor]
            }
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