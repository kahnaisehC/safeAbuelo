import { useEffect, useState } from "react";



enum TipoEvidencia
    {
        CapturaDePantalla,
        EnlaceMalicioso,
        NumeroDeTelefono,
        ComprobanteFinanciero,
        DocumentoFalso

    }

 let placeHolderEvidence :Evidence[] = [
    {
        id: 1,
        tipo: TipoEvidencia.EnlaceMalicioso,
        valor: "http://enlacemalicioso.com.ar",
        notas: "cuando entras hace algo muy malo",
        reporteIncidenteId: 1,
    },
    {
        id: 2,
        tipo: TipoEvidencia.NumeroDeTelefono,
        valor: "+549666666666",
        notas: "si lo agendas, te llama a las 3AM",
        reporteIncidenteId: 2,
    },
    {
        id: 3,
        tipo: TipoEvidencia.DocumentoFalso,
        valor: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.ladbible.com%2Fresize%3Ftype%3Dwebp%26quality%3D70%26width%3D3840%26fit%3Dcontain%26gravity%3Dauto%26url%3Dhttps%3A%2F%2Fimages.ladbiblegroup.com%2Fv3%2Fassets%2Fbltcd74acc1d0a99f3a%2Fblt439535090585ed49%2F67e159777ff78be6988012fc%2Fkhafre_pyramid.webp&f=1&nofb=1&ipt=9be8dcb3badf9af163efffb0a9694d757f81d85ca40ffc50032023e6935d87a4",
        notas: "cuando entras hace algo muy malo",
        reporteIncidenteId: 3,
    },
 ]




export function TipoEvidenciaToString(t: TipoEvidencia){
    switch (t){
        case TipoEvidencia.CapturaDePantalla:
            return "CapturaDePantalla"
        case TipoEvidencia.EnlaceMalicioso:
            return "EnlaceMalicioso"
        case TipoEvidencia.NumeroDeTelefono:
            return "NumeroDeTelefono"
        case TipoEvidencia.ComprobanteFinanciero:
            return "ComprobanteFinanciero"
        case TipoEvidencia.DocumentoFalso:
            return "DocumentoFalso"
        default: 
            return "Otro"
    }

}

export type Evidence = {
  id: number;
  tipo: TipoEvidencia;
  valor: string;
  notas: string;
  reporteIncidenteId: number;
};


export function useCaseEvidences(caseId: number | string) {
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchEvidences = async () => {
      try {
        setLoading(true);
        setError(null);
        /*

        const response = await fetch(
          `https://your-api.com/cases/${caseId}/evidences`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch evidences");
        }

        const data = await response.json();
          */
        setEvidences(placeHolderEvidence);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidences();
  }, [caseId]);

  return { evidences, loading, error };
}