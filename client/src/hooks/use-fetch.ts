import { FetchStatus } from "@/common";
import { useEffect, useState } from "react";

export type UseFetchProps<T extends object> = {
  callback: () => Promise<T[]>;
};

export const useFetch = <T extends object>({ callback }: UseFetchProps<T>) => {
  const [status, setStatus] = useState(FetchStatus.LOADING);
  const [data, setData] = useState<T[]>([]);

  async function handleFetch() {
    const response = await callback();

    setStatus(FetchStatus.SUCCESS)
    setData(response)
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return {
    isLoading: status === FetchStatus.LOADING,
    status,
    data,
    setStatus,
    refetch: handleFetch
  };
}
