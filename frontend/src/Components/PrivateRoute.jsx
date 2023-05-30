import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    const {authState} = useContext(AppContext);
    if(authState.isAuth){
        return children;
    }
    return (<Navigate to='/login' />)
}

export default PrivateRoute;
