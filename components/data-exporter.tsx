"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import type { ExporterConfig, ExportRow } from "@/types";

interface DataExporterProps {
  config: Omit<ExporterConfig, "transformData">; // não passa função
  className?: string;
  preloadedData?: ExportRow[];
}

export default function DataExporter({
  config,
  className,
  preloadedData,
}: DataExporterProps) {
  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("excel");
  const [customFilename, setCustomFilename] = useState(
    config.filename ?? "export"
  );

  const fetchData = async (): Promise<ExportRow[]> => {
    const response = await fetch(config.apiUrl);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  };

  const exportToPDF = async (data: ExportRow[]) => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    const title = config.title ?? "Relatório de Dados";

    // Cabeçalho
    doc.setFontSize(16);
    doc.text(title, 20, 20);

    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 20, 30);

    // Geração de colunas
    const columns =
      config.columns ??
      (data[0] ? Object.keys(data[0]).map((key) => ({ key, label: key })) : []);

    const head = [columns.map((col) => col.label)];
    const body = data.map((row) =>
      columns.map((col) => String(row[col.key] ?? ""))
    );

    // Tabela com auto ajuste
    autoTable(doc, {
      startY: 40,
      head,
      body,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    doc.save(`${customFilename}.pdf`);
  };

  const exportToExcel = async (data: ExportRow[]) => {
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
    XLSX.writeFile(workbook, `${customFilename}.xlsx`);
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const rawData = preloadedData ?? (await fetchData());
      if (exportFormat === "pdf") {
        await exportToPDF(rawData);
      } else {
        await exportToExcel(rawData);
      }
      toast.success(`Exportação concluída: ${customFilename}.${exportFormat}`);
    } catch (e) {
      toast.error("Erro na exportação.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportar Dados
        </CardTitle>
        <CardDescription>
          Exporte os dados da API em formato PDF ou Excel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Formato</Label>
            <Select
              value={exportFormat}
              onValueChange={(v) => setExportFormat(v as "pdf" | "excel")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" /> Excel (.xlsx)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> PDF (.pdf)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Nome do Arquivo</Label>
            <Input
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full" onClick={handleExport} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exportando...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Exportar{" "}
              {exportFormat.toUpperCase()}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
