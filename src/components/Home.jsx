import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";


function Home(){
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    //fetching Data from API
    async function fetchData(){
        try{
            const response = await fetch("https://dummyjson.com/products");
            const result = await response.json();
            setProducts(result.products);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    //detects categories
    useEffect(()=>{
        let cartegorised=[];
        products.forEach((product)=>{
            const found = cartegorised.find((item)=>item.category===product.category);
            if(!found)
            {
                cartegorised.push({
                    id : product.id,
                    category : product.category,
                    image : product.images[0],
                });
            }
        })
        if(cartegorised)
        {
            setCategory(cartegorised);
        }
    },[products]);

    //Home Page
    return(
        <div id="home">
            <h1>Welcome to ShoppyGlobe! Discover a wide range of products and seamless shopping</h1>
            <h2>Choose the product you want to shop based on category</h2>
            <div id="homeCategory">
                {
                    category.map((item,index)=>{
                        return(
                            <Link to={`/product/${item.category}`} key={index}>
                                <div>
                                    <h2>{item.category}</h2>
                                    <img className="homeImage" src={item.image} alt={item.category} height="200px" width="200px"/>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Home;