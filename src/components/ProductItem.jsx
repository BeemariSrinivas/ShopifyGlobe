import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../utils/cartSlice";
import { increaseQuantity } from "../../utils/quantitySlice";

function ProductItem(props){
    const cartItems = useSelector((store)=>store.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const product = props.product;
    function handleClick(item){
        const product = cartItems.find((cartItem)=>cartItem.id===item.id);
        if(product){
            dispatch(increaseQuantity(item));
        }
        else{
            dispatch(addItem(item));
            dispatch(increaseQuantity(item));
        }
    }
    return(
        <div className="product">
            <h2>{product.title}</h2>
            <img src={product.images[0]} alt={product.title} height="200px" width="200px"/>
            <p>{product.description}</p>
            <Link to={`/productDetails/${product.id}`}><h2>View Product Details</h2></Link>
            <button onClick={()=>handleClick(product)}>Add to Cart</button>
        </div>
    )
}


export default ProductItem;