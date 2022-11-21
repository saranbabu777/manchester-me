import { useContext } from 'react';
import { AuthContext } from '../providers/authProvider';

const useAuthentication = () => {
    const { auth, addAuth, removeAuth, authLoading, setAuthLoading, permission } = useContext(AuthContext);
    return { auth, addAuth, removeAuth, authLoading, setAuthLoading, permission };
}

export default useAuthentication;