export default function ConsultaPublicaApp() {
  return (
    <div className="min-h-screen  p-4 space-y-6">
      <header className="text-center py-6 border-b">
        <h1 className="text-3xl font-bold">Consulta Pública - CMC</h1>
        <p className="text-sm ">Plataforma de Participação Regulamentar</p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        <div className=" rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Diploma em Consulta</h2>
          <p className="text-sm  mb-4">
            Título: Regulamento dos Instrumentos Derivados
            <br />
            Período: 10/07/2025 - 31/07/2025
          </p>
          <a href="#" className=" hover:underline">
            Ver Documento (PDF)
          </a>
        </div>

        <div className="rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Submeter Contribuição</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Organização (opcional)"
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Texto da contribuição"
              className="w-full p-2 border rounded h-32"
              required
            />
            <input type="file" className="w-full" />
            <button type="submit" className="bg-primary  px-4 py-2 rounded">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <section className=" rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Relatório Preliminar</h2>
        <ul className="text-sm list-disc pl-4">
          <li>20 contribuições recebidas</li>
          <li>70% com sentimento positivo</li>
          <li>Principais temas: transparência, risco, supervisão</li>
        </ul>
      </section>

      <footer className="text-center text-xs  py-6 border-t">
        © 2025 Comissão do Mercado de Capitais - Angola
      </footer>
    </div>
  );
}
