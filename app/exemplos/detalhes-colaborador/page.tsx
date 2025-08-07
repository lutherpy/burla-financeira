import EmployeeDetails from "@/components/employee-details";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Detalhes do Colaborador</h1>
      <div className="flex justify-start">
        <EmployeeDetails />
      </div>
    </main>
  );
}
