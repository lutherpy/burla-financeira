import { db } from "@/db/drizzle"; // sua instância de conexão
import { provincia } from "@/db/schema";

const provinciasDeAngola = [
  "Bengo",
  "Benguela",
  "Bié",
  "Cabinda",
  "Cuando Cubango",
  "Cuanza Norte",
  "Cuanza Sul",
  "Cunene",
  "Huambo",
  "Huíla",
  "Luanda",
  "Lunda Norte",
  "Lunda Sul",
  "Malanje",
  "Moxico",
  "Namibe",
  "Uíge",
  "Zaire",
];

async function seedProvincias() {
  for (const nome of provinciasDeAngola) {
    await db.insert(provincia).values({ nome });
  }
  console.log("✅ Provincias inseridas com sucesso.");
}

seedProvincias().catch((e) => {
  console.error("❌ Erro ao inserir provincias:", e);
});
