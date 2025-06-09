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
            console.log(found);
            if(found){
                found.count+=1;
            }
            else{
                state.quantity.push(
                    {
                        product : action.payload,
                        count : 1,
                    }
                );
            }
        },
        decreaseQuantity : (state,action)=>{
            const findedProduct = (state.quantity.find((item)=>item.product.id===action.payload.id));
            findedProduct.count = findedProduct.count-1;
        },
    }
});

export const {increaseQuantity,decreaseQuantity} = quantitySlice.actions;

export default quantitySlice.reducer;