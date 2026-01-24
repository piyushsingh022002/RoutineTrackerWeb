import  { Outlet } from "react-router-dom"
import { AuthContainer } from "./AuthLayout.styles";
import AuthSideBar from './AuthSideBar';
import CustomCursor from '../components/common/CustomCursor';

const AuthLayout = () => {
    return (
        <AuthContainer>
            <CustomCursor />
            <AuthSideBar />
            <Outlet />
        </AuthContainer>
    )
}

export default AuthLayout;