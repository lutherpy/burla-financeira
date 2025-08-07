import AusenciaForm from "./_components/ausencia-form";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ausência</h1>
      <div className="flex justify-start">
        <AusenciaForm />
      </div>
    </main>
  );
}
