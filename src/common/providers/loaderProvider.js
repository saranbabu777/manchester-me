import React, { useState, useCallback } from 'react';

export const LoaderContext = React.createContext({
    loader: false,
    showLoader: () => { },
    hideLoader: () => { }
});

const LoaderProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);

    const hideLoader = () => setLoader(false);

    const showLoader = () => setLoader(true);

    const contextValue = {
        loader,
        showLoader: useCallback(() => showLoader(), []),
        hideLoader: useCallback(() => hideLoader(), [])
    };

    return (
        <LoaderContext.Provider value={contextValue}>
            {children}
        </LoaderContext.Provider>
    );
}

export default LoaderProvider;