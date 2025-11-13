import  { Outlet } from "react-router-dom"
import { AuthContainer } from "./AuthLayout.styles";
import AuthSideBar from './AuthSideBar';

const AuthLayout = () => {
    return (
        <AuthContainer>
            <AuthSideBar />
            <Outlet />
        </AuthContainer>
    )
}

export default AuthLayout;