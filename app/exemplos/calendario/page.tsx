import Calendar13 from "@/components/calendar-13";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Calendário de dias úteis</h1>
      <div className="flex justify-start">
        <Calendar13 />
      </div>
    </main>
  );
}
