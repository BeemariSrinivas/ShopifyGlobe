import { Link } from "react-router-dom";
import "../index.css"


function Header(){

    //Header componet for navigation across
    return(
        <ul>
            <Link to="/"><h2>Home</h2></Link>
            <Link to="/product"><h2>Browse Products</h2></Link>
            <Link to="/Cart"><h2>Cart</h2></Link>
            
        </ul>
    )
}


export default Header;