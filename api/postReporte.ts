import { apiString } from "./config";

export interface NuevaEvidencia {
  tipo: string;
  valor: string;
  notas: string;
  linkEvidencia?: string;
}

export interface NuevoReporte {
  authorId: string;
  provincia: string;
  localidad: string;
  plataformaDeContacto: string;
  plataformaOtra: string;
  descripcionDelEngaño: string;
  evidencias: NuevaEvidencia[];
}

export async function createReporte(
  reporte: NuevoReporte,
  token: string
): Promise<void> {
  const response = await fetch(`${apiString}/reporte`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reporte),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Failed to create report (${response.status}): ${message}`
    );
  }
}