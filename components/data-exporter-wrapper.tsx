import DataExporter from "./data-exporter";
import type { ExporterConfig, ExportRow } from "@/types";

type Props<T> = {
  config: ExporterConfig<T>;
};

export default async function DataExporterWrapper<T>({ config }: Props<T>) {
  const res = await fetch(config.apiUrl, { cache: "no-store" });
  const rawData = await res.json();

  const transformed: ExportRow[] = config.transformData
    ? config.transformData(rawData as T)
    : Array.isArray(rawData)
    ? rawData
    : [rawData];

  // Cria uma cópia do config sem transformData
  const configWithoutTransform: Omit<ExporterConfig<T>, "transformData"> = {
    apiUrl: config.apiUrl,
    filename: config.filename,
    title: config.title,
    columns: config.columns,
  };

  return (
    <DataExporter config={configWithoutTransform} preloadedData={transformed} />
  );
}
