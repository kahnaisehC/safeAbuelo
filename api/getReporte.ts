import { apiString } from "./config";
import { Evidencia, UserReporte } from "./getReporteUser";

export async function fetchReporteById(
  id: number
): Promise<UserReporte> {
  const response = await fetch(`${apiString}/reporte/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch report: ${response.status}`);
  }

  const report = await response.json();

  return {
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
    evidencias: (report.evidencias ?? []).map(
      (e: any): Evidencia => ({
        id: Number(e.id),
        tipo: String(e.tipo),
        valor: String(e.valor),
        notas: String(e.notas),
        linkEvidencia: e.linkEvidencia ?? undefined,
      })
    ),
  };
}