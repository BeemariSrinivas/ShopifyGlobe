import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const quantitySlice = createSlice({
    name : "quantity",
    initialState : {
        quantity : [],
    },
    reducers :{
        increaseQuantity : (state,action)=>{
            const found = state.quantity.find((item)=>item.product.id===action.payload.id);
            if(found){
                found.count+=1;
            }
            else{
                state.quantity.push(
                    {
                        product : action.payload,
                        count : 1,
                        checked : false,
                    }
                );
            }
        },
        decreaseQuantity : (state,action)=>{
            const findedProduct = state.quantity.find((item)=>item.product.id===action.payload.id);
            findedProduct.count = findedProduct.count-1;
        },
        selected : (state,action)=>{
            const selected = state.quantity.find((item)=>item.product.id===action.payload.id);
            if(selected.checked===false){
                selected.checked=true;
            }
            else{
                selected.checked=false;
            }
        },
        clearSelected : (state,action)=>{
            state.quantity.map((item)=>item.checked=false);
        },
    }
});

export const {increaseQuantity,decreaseQuantity, selected, clearSelected} = quantitySlice.actions;

export default quantitySlice.reducer;