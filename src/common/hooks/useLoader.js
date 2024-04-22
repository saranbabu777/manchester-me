import { useContext } from 'react';
import { LoaderContext } from '../providers/loaderProvider';

const useLoader = () => {
    const { loader, showLoader, hideLoader } = useContext(LoaderContext);
    return { loader, showLoader, hideLoader };
}

export default useLoader;