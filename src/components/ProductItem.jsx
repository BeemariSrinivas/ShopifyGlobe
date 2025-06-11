import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../utils/cartSlice";
import { increaseQuantity, selected } from "../../utils/quantitySlice";
import "../index.css";

function ProductItem(props){
    const navigate = useNavigate();
    const cartItems = useSelector((store)=>store.cart.items);
    const dispatch = useDispatch();
    const product = props.product;

    //Adding element to cart
    function handleAddToCart(item){
        const product = cartItems.find((cartItem)=>cartItem.id===item.id);
        if(product){
            dispatch(increaseQuantity(item));
        }
        else{
            dispatch(addItem(item));
            dispatch(increaseQuantity(item));
        }
    }

    //Adding element to checkout page
    function handleBuyNow(item){
        const found = cartItems.find((product)=>product?.id===item.id);
        let count=0;
        if(!found){
            dispatch(addItem(item));
        }
        while(count<item.minimumOrderQuantity){
            dispatch(increaseQuantity(item));
            count++;
        }
        dispatch(selected(item));
        alert(`Order quantity will be "${item.minimumOrderQuantity}" and the price will be "${item.price*item.minimumOrderQuantity}"`)
        navigate("/checkout");
    }

    //Product Component reprents a single product
    return(
        <div className="product">
            <h3>{product.title}</h3>
            <img src={product.images[0]} alt={product.title} height="200px" width="200px"/>
            <p>{product.description}</p>
            <h3><sup>₹</sup>{product.price}</h3>
            <Link to={`/productDetails/${product.id}`}><h4>View Product Details</h4></Link>
            <button className="product_button add_to_cart" onClick={()=>handleAddToCart(product)}>Add to Cart</button>
            <button className="product_button buy_now" onClick={()=>handleBuyNow(product)}>Buy Now</button>
        </div>
    )
}


export default ProductItem;