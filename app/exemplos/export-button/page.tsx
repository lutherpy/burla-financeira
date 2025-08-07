import QuickExportButton from "@/components/data-exporter-button";
// app/exemplos/export-button/page.tsx

export default function ExportButtonPage() {
  return (
    <div className="p-6">
      <QuickExportButton
        config={{
          apiUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          filename: "notas",
          title: "Minhas Notas",
          columns: [
            { key: "id", label: "ID" },
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
            { key: "createdAt", label: "Criado em" },
          ],
        }}
        format="pdf" // ou "excel"
      />
    </div>
  );
}
