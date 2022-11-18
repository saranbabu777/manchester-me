import React, { useState, useCallback } from 'react';

export const NotificationContext = React.createContext({
    notification: null,
    addNotification: () => { },
    removeNotification: () => { }
});

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const removeNotification = () => setNotification(null);

    const addNotification = (message, status) => setNotification({ message, status });

    const contextValue = {
        notification,
        addNotification: useCallback((message, status) => addNotification(message, status), []),
        removeNotification: useCallback(() => removeNotification(), [])
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;