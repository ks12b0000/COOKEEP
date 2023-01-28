import {Outlet, Navigate} from "react-router";
import {useSelector} from "react-redux";

const PrivateRoute = ( ) => {
    const user = useSelector(state => state.persistedReducer.userReducer.isLoggedIn);

    return (
            user ? <Outlet /> : <Navigate to="/login" />
    )
}
export default PrivateRoute;