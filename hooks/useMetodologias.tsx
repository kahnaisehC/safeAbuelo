import { useEffect, useState } from "react";

export type Metodologia = {
      "id": number,
      "nombre": string,
      "descripcion": string,
      "principalMotorPsicologico": string,
      "señalesDeAlarma": string,
      "accionPreventiva": string,
      "estaActivo": true
};


export function useMetodologias() {
  const [metodologias, setMetodologias] = useState<Metodologia[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetodologias = async () => {
      try {
        setLoading(true);

        const response = await fetch(
            `http://safeabuelo.runasp.net/api/MetodologiasApi?pagina=${page}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const resJson = await response.json()

        const data: Metodologia[] = resJson.datos

        setMetodologias((metodologias) => {
            for(let i = 0; i < data.length; i++){
                metodologias.push(data[i])
            }
            return metodologias
        });
        if (!resJson.tieneSiguientePagina){
          setHasMoreData(false)
          setLoading(false);
          return
        }

      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetodologias();
  }, [page]);

  return { metodologias, page, setPage, hasMoreData, loading, error };
}