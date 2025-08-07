export type ExportRow = Record<string, string | number | null>;

export type ExporterConfig<T = unknown> = {
  apiUrl: string;
  filename?: string;
  title?: string;
  columns?: { key: string; label: string }[];
  transformData?: (data: T) => ExportRow[];
};
