import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProductDetails(){
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const params = useParams();
    const productID = params.id;

    //fetching data from API
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

    //Product Details component, display details of a single product
    return(
        <div id="productDetails">
            <h1>Product Details</h1>
            {product ?
                <div className="Product">
                    <div className="mainDetails">
                        <h2>{product.title}</h2>
                        <img src={product.images[0]} alt={product.title} height="200px" width="200px"/>
                        <p>{product.description}</p>
                        <h2><sup>₹</sup>{product.price}</h2>
                    </div>
                    <div className="stock">
                        <h4>{`Stock : ${product.availabilityStatus}`}</h4>
                        <h4>{`Delivery : ${product.shippingInformation}`}</h4>
                    </div>
                    <div className="productSpecifications">
                        <h3>Product Specifications</h3>
                        <div>
                            <span>Brand : </span>
                            <span>{product.brand}</span>
                        </div>
                        <div>
                            <span>Product Dimensions : </span>
                            <span>{`${product.dimensions.depth}D X ${product.dimensions.width}W X ${product.dimensions.height}H`}</span>
                        </div>
                        <div>
                            <span>Weight : </span>
                            <span>{`${product.weight} gms`}</span>
                        </div>
                        <div>
                            <span>Warranty : </span>
                            <span>{product.warrantyInformation}</span>
                        </div>
                        <h4>{`Return : ${product.returnPolicy}`}</h4>
                        <h4>{`Rating : ${product.rating}`}</h4>
                    </div>
                    <div id="reviews">
                        <h4>Reviews</h4>
                        <div id="Reviews">
                            {
                            product.reviews.map((review,index)=>{
                                return(
                                    <div className="review" key={index}>
                                        <h5>{`Rating : ${review.rating}`}</h5>
                                        <h4>{review.comment}</h4>
                                        <h5>{`Reviewed by ${review.reviewerName}`}</h5>
                                        <h5>{`Reviewer email : ${review.reviewerEmail}`}</h5>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div> :
                <p>Loading</p>
            }
        </div>
    )
}


export default ProductDetails;

/*


: 
"In Stock"
discountPercentage
: 
18.19

weight
: 
9



*/