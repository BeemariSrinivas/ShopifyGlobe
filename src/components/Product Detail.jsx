import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProductDetails(){
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const params = useParams();
    const productID = params.id;
    async function fetchProducts(){
        try{
            const response = await fetch("https://dummyjson.com/products");
            const result = await response.json();
            setAllProducts(result.products);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
    useEffect(()=>{
        if(productID){
            setProduct(allProducts.find((ele)=>ele.id===Number(productID)));
        }
    },[allProducts]);
    useEffect(()=>{
        console.log(product);
    },[product]);
    return(
        <div id="productDetails">
            <h1>Product Details</h1>
            {product ?
                <div id="product">
                    <h2>{product.title}</h2>
                    <img src={product.images[0]} alt={product.title} height="200px" width="200px"/>
                    <p>{product.description}</p>
                    <h2><sup>₹</sup>{product.price}</h2>
                </div> :
                <p>Loading</p>
            }
        </div>
    )
}


export default ProductDetails;