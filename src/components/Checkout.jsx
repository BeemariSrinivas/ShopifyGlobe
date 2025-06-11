import { useDispatch, useSelector } from "react-redux";
import { clearSelected, selected } from "../../utils/quantitySlice";
import { useNavigate } from "react-router-dom";
import "../index.css"

function Checkout(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quantityItems = useSelector((store)=>store.quantity.quantity);
    let selectedItems = [];
    quantityItems.forEach(item => {
        if(item.checked===true){
            selectedItems.push(item);
        }
    });
    
    //Places Order
    function handleProceedToBuy(){
        dispatch(clearSelected());
        alert("Order Places Successfully!!!!!!, You will be Redirected to Home Page")
        navigate("/");
    }

    //Cancel Order
    function handleCancel(){
        dispatch(clearSelected());
        alert("Order Cancelled, You will be Redirected to Cart")
        navigate("/cart");
    }

    //Calculates final total of selected product
    function handletotal(){
        const total = selectedItems.reduce((acc, item)=>{
            const price = item.product.price*item.count;
            return acc+price;
        },0);
        return ((total*100)/100).toFixed(2);
    }

    //checkout page displays the order information
    return(
        <div id="Checkout">
            <h1>Checkout</h1>
            <form id="form">
                <div>
                    <label htmlFor="">Name : </label>
                    <input type="text" />
                </div><br/>
                <div>
                    <label htmlFor="">Address : </label>
                    <textarea name="address" id="" rows="3" cols="30"></textarea>
                </div><br/>
            </form>
            <div id="SelectedItems">
                {
                    selectedItems.map((product)=>{
                        return(
                            <div className="selectedItem" key={product.product.id}>
                                <h2>{`Product : `}{product.product.title}</h2>
                                <img src={product.product.images[0]} alt={product.product.title} height="200px" width="200px"/>
                                <h3>{`Price : `}{((Math.round(product.product.price*product.count*100))/100).toFixed(2)}</h3>
                            </div>
                        )
                    })
                }
            </div>
            <div id="total">
                <h2>{`Total : `}{handletotal()}</h2>
            </div>
            <div id="checkoutButtons">
                <button onClick={handleProceedToBuy}>Proceed to Buy</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}


export default Checkout;