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

const pageSize = 10 
function getPlaceHolderMetodologias(page: number): Metodologia[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return placeHolderMetodologias.slice(startIndex, endIndex);
}

let placeHolderMetodologias: Metodologia[] = []

for(let i = 0; i < 35; i++){
    let m: Metodologia = {
        id: i,
        nombre: `el cuento del tio ${i}`,
        descripcion: "Recibes una llamada de alguien que dice ser un tio lejano que esta en una situacion URGENTE y necesita MUCHO DINERO por esa situacion",
        principalMotorPsicologico: "Urgencia",
        señalesDeAlarma: "Insistencia, increpaciones, intentas de sembrar culpa",
        accionPreventiva: "contactarse con familiares. Cortar la llamada",
        estaActivo: true
    }
    placeHolderMetodologias.push(m)
}

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

        /*
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: Metodologia[] = await response.json();

          */


        if((page-1)*pageSize >= placeHolderMetodologias.length){
            setHasMoreData(false)
            return
        }
        const data = getPlaceHolderMetodologias(page);
        setMetodologias((metodologias) => {
            for(let i = 0; i < data.length; i++){
                metodologias.push(data[i])
            }
            return metodologias
        });
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