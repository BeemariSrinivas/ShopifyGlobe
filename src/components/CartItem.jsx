import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeItem } from "../../utils/cartSlice";
import { decreaseQuantity, increaseQuantity } from "../../utils/quantitySlice";
import "../index.css";

function CartItem(){
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const params= useParams();
    const id = params.id;
    const  quantity = useSelector((store)=>store.quantity.quantity);
    const cartItems = useSelector((store)=>store.cart.items);
    const dispatch = useDispatch();

    //Navigates back to cart when the product quantity is decresed to less than 1
    useEffect(()=>{
        quantity.forEach(element => {
            if(element.count<=0){
                navigate("/Cart");
            }
        });
    },[quantity, dispatch]);


    const productID = Number(id);
    const found = cartItems.find((item)=>item.id===productID);

    //remove element from cart if the quantity of product is decreased to less than 1
    useEffect(()=>{
        cartItems.forEach(element => {
            if(element.count<=0){
                dispatch(removeItem(element.product));
            }
        });
    },[cartItems,dispatch]);

    //remove element from cart and navigate you back to cart
    function handleRemoveItem(item){
        dispatch(removeItem(item));
        alert("Product Removed!!! Redirecting You to Cart");
        navigate("/Cart");
    }

    //increase item quantity
    function handleIncreaseQunatity(item){
        dispatch(increaseQuantity(item));
    }

    //decrease item quantity
    function handleDecreaseQunatity(item){
        dispatch(decreaseQuantity(item));
    }

    //finds and returns quantity of the item
    useEffect(()=>{
        const productQuantity = quantity.find((product)=>product?.product?.id===found?.id);
        if(productQuantity){
            setCount(productQuantity.count);
        }
    },[quantity,cartItems]);

    if (!found || !found.images) {
        return <div>Loading item details...</div>;
    }

    //CartItem component display information of singel cart item
    return(
        <div id="cartItemDetails">
           <img src={found.images[0]} alt={found.title} height="100px" width="100px"/>
           <h3>{found.title}</h3>
           <h3>{found.price}</h3>
            <div className="quantity">
                <button onClick={()=>handleDecreaseQunatity(found)}>-</button>
                {count}
                <button onClick={()=>handleIncreaseQunatity(found)}>+</button>
            </div>
            <button className="cartButton" onClick={()=>handleRemoveItem(found)}>Remove</button>
        </div>
    )
}


export default CartItem;

/*
*/