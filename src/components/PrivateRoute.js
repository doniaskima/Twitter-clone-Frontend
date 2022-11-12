import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authProvider";

const PrivateRouter = ({ component: Component, path }) => {
    const { user } = useAuth();
    return user == null ? (
        <Navigate to="/"/>
    ) : (
            <Component path={path} /> 
    )
}

export default PrivateRouter;