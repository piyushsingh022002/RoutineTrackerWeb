import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTE_PATHS from "./RoutePaths";

const PrivateRoutes = () =>{

    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <Outlet/>: <Navigate to={ROUTE_PATHS.LOGIN} />;


}

export default PrivateRoutes;