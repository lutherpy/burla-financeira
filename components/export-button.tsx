"use client";

import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export function ExportButtons() {
  const downloadFile = async (type: "excel" | "pdf") => {
    const res = await fetch("/api/export", {
      method: "GET",
    });

    if (!res.ok) {
      alert("Erro ao exportar os dados.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "excel" ? "user-details.xlsx" : "user-details.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-4">
      <Button onClick={() => downloadFile("excel")}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Exportar para Excel
      </Button>
      {/* Para PDF, você precisará adaptar a rota ou criar outra */}
      {/* <Button onClick={() => downloadFile("pdf")}>
        <FileText className="mr-2 h-4 w-4" />
        Exportar para PDF
      </Button> */}
    </div>
  );
}
