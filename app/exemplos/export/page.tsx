// app/exemplos/export/page.tsx

import DataExporterWrapper from "@/components/data-exporter-wrapper";
import type { ExporterConfig, ExportRow } from "@/types";
import { User } from "@/db/schema";

// Define o formato esperado da resposta da API

interface ApiResponse {
  data: User[];
}

export default function ExportPage() {
  const notesDetails: ExporterConfig<ApiResponse> = {
    apiUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    filename: "detalhes-notas",
    title: "Relatório de Detalhes das Notas",
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Nome do Utilizador" },
      { key: "email", label: "Email" },
      { key: "createdAt", label: "Data de Criação" },
    ],
    transformData: (response): ExportRow[] => {
      if (!response?.data?.length) return [];
      return response.data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        createdAt:
          item.createdAt instanceof Date
            ? item.createdAt.toISOString() // ou formatar para "dd/MM/yyyy"
            : String(item.createdAt),
      }));
    },
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Exportação de Notas</h1>
      <p className="text-gray-500 mb-6">
        Exporte os detalhes das notas em formato Excel ou PDF.
      </p>
      <DataExporterWrapper config={notesDetails} />
    </div>
  );
}
