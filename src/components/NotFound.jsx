import { useNavigate } from "react-router-dom";
import "../index.css"




function NotFound(){
    const navigate = useNavigate();
    function handleReturnToHome(){
        navigate("/");
    }

    //Not found page
    return(
        <div id="notFound">
            <h1>OOPS!!!!!! PAGE NOT FOUND</h1>
            <button onClick={handleReturnToHome}>Return to Home</button>
        </div>
    )
}


export default NotFound;