import { Link } from "react-router-dom";
import "../index.css"


function Header(){
    return(
        <ul>
            <Link to="/"><h2>Home</h2></Link>
            <Link to="/ProductList"><h2>Browse Product</h2></Link>
            <Link to="/Cart"><h2>Cart</h2></Link>
        </ul>
    )
}


export default Header;