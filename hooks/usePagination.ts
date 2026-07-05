import { useEffect, useState } from "react";

export function usePagination<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {

        const res = await fetch(`${url}?page=${page}`);
        if(res.status === 204){
          console.log("no more data to fetch")
          return
        }
        const json = await res.json();

        setData(prev => {
          for(let v of json){
            prev.push(v)
          }
          return prev
        });

      }
      catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    }

    fetchData();
  }, [url, page]);

  return {
    data,
    loading,
    page,
    next: () => setPage((p) => p + 1),
    setPage,
  };
}