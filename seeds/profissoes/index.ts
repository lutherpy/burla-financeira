import { db } from "@/db/drizzle"; // sua instância de conexão
import { profissao } from "@/db/schema"; // ajuste para o nome real da tabela

const profissoesDeAngola = [
  "Advogado",
  "Agricultor",
  "Arquiteto",
  "Artista",
  "Actor",
  "Bancário",
  "Bombeiro",
  "Comerciante",
  "Contabilista",
  "Dentista",
  "Designer",
  "Eletricista",
  "Enfermeiro",
  "Engenheiro",
  "Estudante",
  "Farmacêutico",
  "Fotógrafo",
  "Funcionário Público",
  "Jornalista",
  "Juiz",
  "Mecânico",
  "Médico",
  "Militar",
  "Motorista",
  "Pedreiro",
  "Pesquisador",
  "Piloto",
  "Policial",
  "Professor",
  "Programador",
  "Secretário",
  "Soldador",
  "Informático",
  "Tradutor",
  "Vendedor",
  "Veterinário",
];

async function seedProfissoes() {
  for (const nome of profissoesDeAngola) {
    await db.insert(profissao).values({ nome });
  }
  console.log("✅ Profissões inseridas com sucesso.");
}

seedProfissoes().catch((e) => {
  console.error("❌ Erro ao inserir profissões:", e);
});
