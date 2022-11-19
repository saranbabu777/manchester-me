import { useContext } from 'react';
import { AuthContext } from '../providers/authProvider';

const useAuthentication = () => {
    const { auth, addAuth, removeAuth, permission } = useContext(AuthContext);
    return { auth, addAuth, removeAuth, permission };
}

export default useAuthentication;