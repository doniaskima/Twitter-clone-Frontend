import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const PrivateRouter = () => {
    
    const userState = useSelector((state) => state.user);
    const initialLoading = useSelector((state) => state.initialLoading);
    if (initialLoading) {
        return <LoadingPage />;
    }
    if (userState.isUserLoggedIn) {
        return <Outlet />;
    }
    
    return <Navigate to="/" replace/>
}

export default PrivateRouter;