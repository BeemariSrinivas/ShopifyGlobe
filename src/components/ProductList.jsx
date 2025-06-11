import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import "../index.css"


function ProductList(){
    const [notfound, setNotFound] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const {category: routeCategory} = useParams();
    const [name , setName] = useState("");
    const navigate = useNavigate();

    //fetching data from the API
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


    //Detecting categories
    useEffect(()=>{
        const unique = [...new Set(allProduct.map((product)=>product.category))];
        setCategory(unique);
        },[allProduct]
    );

    //Filtering products based on category
    useEffect(()=>{
        if(routeCategory&&allProduct.length>0)
        {
            const categorisedProduct = allProduct.filter((product)=>product.category===routeCategory);
            setProducts(categorisedProduct);
        }
        else{
            setProducts(allProduct);
        }
    },[routeCategory, allProduct]);

    //Detecting searched product name
    function handleSearchName(event){
        const {value} = event.target;
        setName(value);
    }


    //Searching product
    function handleProductSearch(){
        if(name===""){
            setProducts(allProduct);
            setNotFound(false);
        }
        else{
            let tagSearch = [];
            let titleSearch=[];

            allProduct.forEach((product)=>{
                product.tags.forEach((tag)=>{
                    if(tag.toLowerCase()===name.trim().toLowerCase()){
                        tagSearch.push(product);
                    }
                });
            })

            allProduct.forEach((product)=>{
                if(product.title.toLowerCase()===name.trim().toLowerCase()){
                    titleSearch.push(product);
                }
            })

            if(tagSearch.length>0){
                console.log("In");
                setProducts(tagSearch);
                setNotFound(false);
            }
            else if(titleSearch.length>0){
                setProducts(titleSearch);
                setNotFound(false);
            }
            else{
                setProducts([]);
                setNotFound(true);
            }
        }
        setName("");
    }

    //Clearing applied filter
    function handleClearFilter(){
        navigate("/product");
    }

    //Product List Component display list of all avaliale components
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
            <button onClick={handleClearFilter}>Clear Filter</button>

            <div id="search">
                <label htmlFor="searchProduct">Search product: </label>
                <input value={name} onChange={handleSearchName} id="searchedProduct" type="text"/>
                <button id="search_button" onClick={handleProductSearch}>Search</button>
            </div>

            <div id="products">
            {
                notfound ? (
                    <div><h1>Item Not Found</h1></div>
                ) :
                    products.map((product)=>{
                        return(
                            <Suspense key={product.id} fallback={<div>Loading product</div>}>
                                <ProductItem  product={product}/>
                            </Suspense>
                        )
                    })
            }
            </div>
        </div>
    )
}


export default ProductList;