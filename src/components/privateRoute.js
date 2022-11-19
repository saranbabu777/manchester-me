
import { Navigate } from "react-router-dom";
import useAuthentication from '../common/hooks/useAuthentication';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { auth, permission } = useAuthentication();

    if (!auth) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
}