import { apiString } from "@/api/config";

export interface Reporte {
  id: number;
  author: string;
  dateTime: Date;
  provincia: string;
  localidad: string;
  plataformaDeContacto: string;
  plataformaOtra: string;
  ejercePresionPsicologica: boolean;
  generaSentidoDeUrgencia: boolean;
  descripcionDelEngaño: string;
  estado: string;
}

export async function fetchReportes(page: number = 1): Promise<Reporte[]> {
    const response = await fetch(`${apiString}/reporte/?page=${page}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.status}`);
  }

  const data = await response.json();


  return (data as any[]).map((report): Reporte => ({
    id: (report.id),
    author: (report.author),
    dateTime: new Date(report.dateTime),
    provincia: (report.provincia),
    localidad: (report.localidad),
    plataformaDeContacto: (report.plataformaDeContacto),
    plataformaOtra: (report.plataformaOtra ?? ""),
    ejercePresionPsicologica: (report.ejercePresionPsicologica),
    generaSentidoDeUrgencia: (report.generaSentidoDeUrgencia),
    descripcionDelEngaño: (report.descripcionDelEngaño),
    estado: (report.estado),
  }));
}
