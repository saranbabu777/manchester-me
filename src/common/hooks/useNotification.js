import { useContext } from 'react';
import { NotificationContext } from '../providers/notificationProvider';

const useNotification = () => {
    const { notification, addNotification, removeNotification } = useContext(NotificationContext);
    return { notification, addNotification, removeNotification };
}

export default useNotification;