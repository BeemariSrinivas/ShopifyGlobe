import { Link, useNavigate } from "react-router-dom";

function ProductItem(props){
    const navigate = useNavigate(); 
    const product = props.product;
    function handleClick(){
        
    }
    return(
        <div className="product">
            <h2>{product.title}</h2>
            <img src={product.images[0]} alt={product.title} height="200px" width="200px"/>
            <p>{product.description}</p>
            <Link to={`/productDetails/${product.id}`}><h2>View Product Details</h2></Link>
            <button onClick={handleClick}>Add to Cart</button>
        </div>
    )
}


export default ProductItem;