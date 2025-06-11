import { useDispatch, useSelector } from "react-redux";
import "../index.css"
import { removeItem } from "../../utils/cartSlice";
import { decreaseQuantity, increaseQuantity, selected } from "../../utils/quantitySlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((store)=>store.cart.items);
    const quantityItems = useSelector((store)=>store.quantity.quantity);

    
    //remove element from cart if the quantity of product is decreased to less than 1
    useEffect(()=>{
        quantityItems.forEach(element => {
            if(element.count<=0){
                dispatch(removeItem(element.product));
            }
        });
    },[quantityItems, dispatch]);

    //remove item fron cart
    function handleRemoveItem(item){
        dispatch(removeItem(item));
    }

    //increase cart item quantity
    function handleIncreaseQunatity(item){
        dispatch(increaseQuantity(item));
    }

    //decrease cart item quantity
    function handleDecreaseQunatity(item){
        dispatch(decreaseQuantity(item));
    }

    //reads and display cart items quantity
    function handlecount(item){
        const productQuantity = quantityItems.find((product)=>product.product.id===item.id).count;
        return productQuantity
    }

    //Displays cart empty message when cart is empty
    if(cartItems.length<=0){
       return <div id="emptycart"><h1>Your ShopifyGlobe Cart is Empty</h1></div>
    }

    //detects selected items
    function handleSelected(item){
        dispatch(selected(item));
    }
    

    //moves all selected products to checkout page
    function handleBuyProducts(){
        const items = quantityItems.filter((product)=>product?.checked===true);
        if(items.length<=0){
            alert("Please select items");
        }
        else{
            let allValid=true;
            items.map((product)=>{
                if(product.count<product.product.minimumOrderQuantity){
                    alert(`Plese increase the quantity of selected item "${product.product.title}" more than or equal to minimum Order Quantity of the item:"${product.product.minimumOrderQuantity}"`);
                    allValid=false;
                }
            })
            if(allValid){
                navigate("/checkout");
            }
        }
    }

    //displays prices of each items in cart
    function handlePrice(item){
        const found = quantityItems.find((product)=>product.product.id===item.id);
        const price = item.price*found.count;
        return (Math.round(price*100)/100).toFixed(2);
    }

    //Cart component displays all items in cart
    return(
        <div id="Cart">
            <h1>Cart</h1>
            <div id="CartItems">
            {
                cartItems.map((item)=>{
                    return(
                        <div className="item" key={item.id}>
                            <input onChange={()=>handleSelected(item)}
                                checked={quantityItems.find((product)=>product.product.id===item.id)?.checked||false}
                                type="checkbox"
                            />
                            <img src={item.images[0]} alt={item.title} height="100px" width="100px"/>
                            <div>
                                <h4>{item.title}</h4>
                                <h4><sup>₹</sup>{handlePrice(item)}</h4>
                            </div>

                            <div id="quantity">
                                <button onClick={()=>handleDecreaseQunatity(item)}>-</button>
                                <h3>{handlecount(item)}</h3>
                                <button onClick={()=>handleIncreaseQunatity(item)}>+</button>
                            </div>
                            <button className="cartButton" onClick={()=>handleRemoveItem(item)}>Remove</button>
                            <Link to={`/cart/${item.id}`}><h6>View Details</h6></Link>
                        </div>
                    )
                })   
            }
            </div>
            <button className="cartButton" onClick={handleBuyProducts}>Buy Products</button>
        </div>
    )
}


export default Cart;