import { Calendar, Code, CheckCircle, Archive } from "lucide-react";

const timelineData = [
  {
    phase: "Fase 1",
    title: "Planeamento",
    date: "Abril a Junho 2022",
    description: "Definição dos requisitos e arquitetura da solução.",
    icon: Code,
    color: "bg-blue-500",
  },
  {
    phase: "Fase 2",
    title: "Implementação",
    date: "Julho a Outubro 2022",
    description: "Desenvolvimento da solução e preparação para produção.",
    icon: Calendar,
    color: "bg-green-500",
  },
  {
    phase: "Fase 3",
    title: "Validação e Go-Live",
    date: "Novembro 2022",
    description: "Testes finais, ajustes com base no feedback e Go-Live.",
    icon: CheckCircle,
    color: "bg-orange-500",
  },
  {
    phase: "Fase 4",
    title: "Encerramento",
    date: "Dezembro 2022",
    description: "Formação de utilizadores e encerramento formal do projeto.",
    icon: Archive,
    color: "bg-purple-500",
  },
];

export default function Timeline() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-3">
          Cronograma do Projeto
        </h1>
        <p className="text-muted-foreground text-center text-lg">
          Desenvolvimento da solução - 2022
        </p>
      </div>

      {/* Desktop Timeline - Single Row */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-purple-500 transform -translate-y-1/2 rounded-full"></div>

          {/* Timeline items */}
          <div className="grid grid-cols-4 gap-8 relative">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col items-center group">
                  {/* Phase badge */}
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {item.phase}
                  </div>

                  {/* Icon circle */}
                  <div
                    className={`${item.color} w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 z-10 mb-4`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full text-center transform transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <div className="text-sm font-semibold text-blue-600 mb-3 flex items-center justify-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-blue-500 mt-1">🔹</span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet Timeline - 2x2 Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-8">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center group">
                {/* Phase badge */}
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  {item.phase}
                </div>

                {/* Icon circle */}
                <div
                  className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-full text-center transform transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <h3 className="text-base font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-2 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                    <span className="text-blue-500 mt-1">🔹</span>
                    <span>{item.description}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 via-orange-500 to-purple-500 rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center mr-6">
                    {/* Phase badge */}
                    <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold mb-2">
                      {item.phase}
                    </div>

                    {/* Icon circle */}
                    <div
                      className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 z-10`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <div className="text-sm font-semibold text-blue-600 mb-3 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                      <span className="text-blue-500 mt-1">🔹</span>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
