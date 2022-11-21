import React, { useState, useCallback } from 'react';

export const AuthContext = React.createContext({
    auth: null,
    addAuth: () => { },
    removeAuth: () => { }
});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const removeAuth = () => setAuth(null);

    const addAuth = (email, role) => setAuth({ email, role });

    const contextValue = {
        auth,
        addAuth: useCallback((email, role) => addAuth(email, role), []),
        removeAuth: useCallback(() => removeAuth(), []),
        authLoading,
        setAuthLoading: useCallback((loading) => setAuthLoading(loading), []),
        permission: { STAFF: 'staff', ADMIN: 'admin' }
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;