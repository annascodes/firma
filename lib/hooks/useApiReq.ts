import { useCallback, useState } from "react";

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;

}

export function useApiReq<T = unknown>() {
    const [data, setData] = useState<ApiState<T>['data']>(null);
    const [loading, setLoading] = useState<ApiState<T>['loading']>(false);
    const [error, setError] = useState<ApiState<T>['error']>(null);

    const request = useCallback(async (
        url: string,
        method: HttpMethod = 'GET',
        body?: Record<string, unknown>): Promise<T | null> => {
        setLoading(true)
        setError(null)
        setData(null)
        try {
            const res = await fetch(url, {
                method,
                headers: body ? { 'Content-Type': 'Application/json' } : undefined,
                body: body ? JSON.stringify(body) : undefined,
            })

            const result: T = await res.json()
            if (!res.ok) {
                const errMsg = (result as unknown as { error?: string }).error ?? 'Something went wrong'
                setError(errMsg)
                return null;
            } else {
                setData(result)
                return result
            }
        } catch (error) {
            const catchErrMsg = error instanceof Error ? error.message: 'unknown error occured'
            setData(null);
            setError(catchErrMsg)
            return null;
        }finally{
            setLoading(false)
        }
    }, [])
    return { request, data, loading, error };

}