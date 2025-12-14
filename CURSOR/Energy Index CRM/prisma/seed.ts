import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed iniciado...");

  // Nota: Este seed é opcional e apenas para desenvolvimento
  // Em produção, os perfis são criados via Supabase Auth + API route

  console.log("✅ Seed concluído (sem dados de exemplo)");
  console.log("💡 Os perfis são criados automaticamente após registo via Supabase Auth");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

