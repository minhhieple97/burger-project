import { useState, useEffect } from 'react';
export default httpClient => {
    const [error, setError] = useState(null);
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);//Hủy các interceptors này khi component bị unmount
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [httpClient,reqInterceptor, resInterceptor])
    const errorHandler = () => {
        setError(null);
    }
    return [
        error,
        errorHandler
    ]
}