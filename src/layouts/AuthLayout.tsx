import  { Outlet } from "react-router-dom"
import { AuthContainer, LoaderOverlay } from "./AuthLayout.styles";
import AuthSideBar from './AuthSideBar';
import CustomCursor from '../components/common/CustomCursor';
import { useAuth } from '../context/AuthContext';
import { NotebookLoader } from '../components/common';

const AuthLayout = () => {
    const { isLoading } = useAuth();

    return (
        <AuthContainer>
            <CustomCursor />
            <AuthSideBar />
            {isLoading && (
                <LoaderOverlay>
                    <NotebookLoader 
                        message="Please wait" 
                        subtext="Processing your request"
                    />
                </LoaderOverlay>
            )}
            <Outlet />
        </AuthContainer>
    )
}

export default AuthLayout;