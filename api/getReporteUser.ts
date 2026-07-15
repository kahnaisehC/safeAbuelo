import { apiString } from "@/api/config";

export interface Evidencia {
  id: number;
  tipo: string;
  valor: string;
  notas: string;
  linkEvidencia?: string;
}

export interface UserReporte {
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
  evidencias: Evidencia[];
}

export async function fetchUserReportes(
  userId: string,
  token: string
): Promise<UserReporte[]> {
  const response = await fetch(`${apiString}/reporte/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.status}`);
  }

  const data = await response.json();
  console.log(data)

  return (data as any[]).map((report): UserReporte => ({
    id: Number(report.id),
    author: String(report.author),
    dateTime: new Date(report.dateTime),
    provincia: String(report.provincia),
    localidad: String(report.localidad),
    plataformaDeContacto: String(report.plataformaDeContacto),
    plataformaOtra: String(report.plataformaOtra ?? ""),
    ejercePresionPsicologica: Boolean(report.ejercePresionPsicologica),
    generaSentidoDeUrgencia: Boolean(report.generaSentidoDeUrgencia),
    descripcionDelEngaño: String(report.descripcionDelEngaño),
    estado: String(report.estado),
    evidencias: (report.evidencias ?? []).map((e: any): Evidencia => ({
      id: Number(e.id),
      tipo: String(e.tipo),
      valor: String(e.valor),
      notas: String(e.notas),
      linkEvidencia: e.linkEvidencia ?? undefined,
    })),
  }));
}