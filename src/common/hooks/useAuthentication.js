import { useContext } from 'react';
import { AuthContext } from '../providers/authProvider';

const useAuthentication = () => {
    const { auth, addAuth, removeAuth } = useContext(AuthContext);
    return { auth, addAuth, removeAuth };
}

export default useAuthentication;