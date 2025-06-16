import { FetchStatus } from "@/common";
import { useEffect, useState, useCallback } from "react";

export type UseFetchProps<T extends object, P = void> = {
  callback: (params: P) => Promise<T>;
  params: P;
};

export const useFetch = <T extends object, P = void>({
  callback,
  params,
}: UseFetchProps<T, P>) => {
  const [status, setStatus] = useState(FetchStatus.LOADING);
  const [data, setData] = useState<T>();

  const handleFetch = useCallback(async () => {
    setStatus(FetchStatus.LOADING);
    const response = await callback(params);
    setStatus(FetchStatus.SUCCESS);
    setData(response);
  }, [callback, params]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    isLoading: status === FetchStatus.LOADING,
    status,
    data,
    setStatus,
    refetch: handleFetch,
  };
};
