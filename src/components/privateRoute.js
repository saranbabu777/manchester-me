
import { Navigate } from "react-router-dom";
import useAuthentication from '../common/hooks/useAuthentication';

const PrivateRoute = ({ children, role }) => {
    const { auth } = useAuthentication();

    if (!auth || (role && auth?.role !== role)) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;