"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import type { ExporterConfig, ExportRow } from "@/types";

type Props = {
  config: Omit<ExporterConfig, "transformData">;
  preloadedData?: ExportRow[];
  format?: "pdf" | "excel";
  label?: string;
};

export default function QuickExportButton({
  config,
  preloadedData,
  format = "excel",
  label = "Exportar",
}: Props) {
  const [loading, setLoading] = useState(false);

  const fetchData = async (): Promise<ExportRow[]> => {
    const response = await fetch(config.apiUrl);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const json = await response.json();

    // Se a API retorna { data: [...] }
    const data = Array.isArray(json) ? json : json.data;

    if (!Array.isArray(data)) {
      throw new Error("Formato de resposta inválido da API.");
    }

    return data;
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const data = preloadedData ?? (await fetchData());

      if (format === "pdf") {
        const { jsPDF } = await import("jspdf");
        const autoTable = (await import("jspdf-autotable")).default;

        const doc = new jsPDF();
        const title = config.title ?? "Relatório de Dados";

        doc.setFontSize(16);
        doc.text(title, 20, 20);

        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 20, 30);

        const columns =
          config.columns ??
          (data[0]
            ? Object.keys(data[0]).map((key) => ({ key, label: key }))
            : []);

        const head = [columns.map((col) => col.label)];
        const body = data.map((row) =>
          columns.map((col) => String(row[col.key] ?? ""))
        );

        autoTable(doc, {
          startY: 40,
          head,
          body,
          styles: {
            fontSize: 10,
            cellPadding: 3,
          },
          headStyles: {
            fillColor: [37, 99, 235], // bg-primary convertido de #2563eb
            textColor: 255,
            fontStyle: "bold",
          },
          theme: "grid",
        });

        doc.save(`${config.filename ?? "export"}.pdf`);
      } else {
        const XLSX = await import("xlsx");

        let worksheetData: (string | number)[][] = [];

        if (data.length === 0) {
          worksheetData = [["Nenhum dado encontrado"]];
        } else if (config.columns) {
          const headers = config.columns.map((c) => c.label);
          const rows = data.map((row) =>
            config.columns!.map((c) => row[c.key] ?? "")
          );
          worksheetData = [headers, ...rows];
        } else {
          const keys = Object.keys(data[0]);
          worksheetData = [
            keys,
            ...data.map((row) => keys.map((k) => row[k] ?? "")),
          ];
        }

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
        XLSX.writeFile(workbook, `${config.filename ?? "export"}.xlsx`);
      }

      toast.success("Exportação concluída!");
    } catch (error) {
      toast.error("Erro ao exportar.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={loading}>
      {loading ? (
        "Exportando..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" /> {label}
        </>
      )}
    </Button>
  );
}
