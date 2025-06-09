import { useDispatch, useSelector } from "react-redux";
import "../index.css"
import { removeItem } from "../../utils/cartSlice";
import { decreaseQuantity, increaseQuantity } from "../../utils/quantitySlice";
import { useEffect } from "react";

function Cart(){
    const dispatch = useDispatch();
    const cartItems = useSelector((store)=>store.cart.items);
    const quantityItems = useSelector((store)=>store.quantity.quantity);
    useEffect(()=>{
        quantityItems.forEach(element => {
            if(element.count<=0){
                dispatch(removeItem(element.product));
            }
        });
    },[quantityItems, dispatch]);
    function handleRemoveItem(item){
        dispatch(removeItem(item));
    }
    function handleIncreaseQunatity(item){
        dispatch(increaseQuantity(item));
    }
    function handleDecreaseQunatity(item){
        dispatch(decreaseQuantity(item));
    }
    return(
        <div id="Cart">
            <h1>Cart</h1>
            <div id="cartItems">
            {
                cartItems.map((item)=>{
                    return(
                        <div id="item" key={item.id}>
                            <img src={item.images[0]} alt={item.title} height="100px" width="100px"/>
                            <div>
                                <h4>{item.title}</h4>
                                <h6>{item.price}</h6>
                            </div>

                            <div id="quantity">
                                <button onClick={()=>handleDecreaseQunatity(item)}>-</button>
                                <h3>{
                                        quantityItems.find((ele)=>ele.product===item).count
                                    }    
                                </h3>
                                <button onClick={()=>handleIncreaseQunatity(item)}>+</button>
                            </div>
                            <button onClick={()=>handleRemoveItem(item)}>Remove</button>
                        </div>
                    )
                })   
            }
            </div>
        </div>
    )
}


export default Cart;