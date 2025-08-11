export const profissoes = [
  "Advogado",
  "Analista Financeiro",
  "Contabilista",
  "Economista",
  "Enfermeiro",
  "Financeiro",
  "Funcionário Público",
  "Gestor",
  "Informático",
  "Jurista",
  "Médico",
  "Professor",
] as const;

export type Profissao = (typeof profissoes)[number];
