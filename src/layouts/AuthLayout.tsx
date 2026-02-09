import  { Outlet } from "react-router-dom"
import { AuthContainer, AuthContent} from "./AuthLayout.styles";
import AuthSideBar from './AuthSideBar';
import CustomCursor from '../components/common/CustomCursor';
// import { useAuth } from '../context/AuthContext';
// import { NotebookLoader } from '../components/common';

const AuthLayout = () => {

    return (
        <AuthContainer>
            <CustomCursor />
            <AuthSideBar />
            <AuthContent>
                <Outlet />
            </AuthContent>
        </AuthContainer>
    )
}

export default AuthLayout;