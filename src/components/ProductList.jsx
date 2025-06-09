import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "./ProductItem";


function ProductList(){
    const [allProduct, setAllProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const {category: routeCategory} = useParams();
    async function fetchProducts(){
        try{
            const response = await fetch("https://dummyjson.com/products");
            const result = await response.json();
            setProducts(result.products);
            setAllProduct(result.products);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);


    useEffect(()=>{
        const unique = [...new Set(allProduct.map((product)=>product.category))];
        setCategory(unique);
        },[allProduct]
    );


    useEffect(()=>{
        if(routeCategory)
        {
            const categorisedProduct = allProduct.filter((product)=>product.category===routeCategory);
            console.log(categorisedProduct);
            setProducts(categorisedProduct);
        }
        else{
            setProducts(allProduct);
        }
    },[routeCategory, allProduct]);


    return(
        <div id="productList">
            <h1>Product List</h1>
            <h2>Apply Filter</h2>
            <div id="category">
                {category.map((productCategory,index)=>{
                    return (
                        <div key={index}>
                            <Link to={`/Product/${productCategory}`}><h2>{productCategory}</h2></Link>
                        </div>
                    )
                })}
            </div>
            <div id="products">
            {products.map((product)=>{
                return(
                    <ProductItem key={product.id} product={product}/>
                )
            })}
            </div>
        </div>
    )
}


export default ProductList;