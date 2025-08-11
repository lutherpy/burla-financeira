export const profissoes = [
  "Advogado",
  "Analista Financeiro",
  "Economista",
  "Financeiro",
  "Gestor",
  "Informático",
  "Jurista",
  "Médico",
  "Professor",
] as const;

export type Profissao = (typeof profissoes)[number];
