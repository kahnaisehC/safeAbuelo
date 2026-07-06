import { useEffect, useState } from "react";



export type ForoLinkProps ={
    id: Number ,
    dateTime: Date,
    localidad: string,
    plataformaDeContacto: string,
    ejercePresionPsicologica: boolean,
    generaSentidoDeUrgencia: boolean,
    descripcionDelEngaño: string,
    estado: string,
}

export type Evidence = {
    Id: Number
}




const pageSize = 10 
function getPlaceHolderPosts (page: number): ForoLinkProps[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return placeHolderPosts.slice(startIndex, endIndex);
}

let placeHolderPosts: ForoLinkProps[]= []

for(let i = 0; i < 35; i++){
    let m: ForoLinkProps= {
        id: i,
        dateTime: new Date(),
        localidad: `Resistencia`,
        plataformaDeContacto: "Whatsapp",
        ejercePresionPsicologica: false,
        descripcionDelEngaño: `Envian un mensaje con un link a "mercadopango". Una vez la victima ingresa al link, se le piden sus credenciales y esta, al aceptar, cae en el engaño`,
        generaSentidoDeUrgencia: false,
        estado: "aceptado"
    }
    let m2: ForoLinkProps= {
        id: i+35,
        dateTime: new Date(),
        localidad: `Resistencia`,
        plataformaDeContacto: "SMS",
        ejercePresionPsicologica: true,
        descripcionDelEngaño: `Llaman insistentemente diciendo que son personal del banco y exigen que se les envien "los numeros de la parte de atras" de la tarjeta para hacer verificaciones de seguridad`,
        generaSentidoDeUrgencia: true,
        estado: "aceptado"
    }
    let m3: ForoLinkProps= {
        id: i+70,
        dateTime: new Date(),
        localidad: `Resistencia`,
        plataformaDeContacto: "Facebook",
        ejercePresionPsicologica: false,
        descripcionDelEngaño: `Envian un mensaje diciendo que tienen una oferta por tiempo limitado`,
        generaSentidoDeUrgencia: true,
        estado: "aceptado"
    }

    placeHolderPosts.push(m)
    placeHolderPosts.push(m2)
    placeHolderPosts.push(m3)

}
placeHolderPosts= placeHolderPosts
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)


export function useForumPosts() {
  const [oldForoLinks, setOldForoLinks] = useState<ForoLinkProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOldForo = async () => {
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


        if((page-1)*pageSize >= placeHolderPosts.length){
            setHasMoreData(false)
            return
        }
        const data = getPlaceHolderPosts(page);
        setOldForoLinks((metodologias) => {
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

    fetchOldForo();
  }, [page]);

  return { oldForoLinks, page, setPage, hasMoreData, loading, error };
}