import { useEffect, useState } from "react";

export const useGetData = <T>(url: string, token: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: 5,
          },
        });

        setData(await res.json());
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setData(null);
        setIsLoading(false);
        setIsError(true);
      }
    };
    getData();
  }, [url, token]);

  return { data, isLoading, isError };
};
