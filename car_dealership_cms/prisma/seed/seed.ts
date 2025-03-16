import { PrismaClient } from "@prisma/client";
import { seedAdmin } from "./admin.seed";
import { seedClassifieds } from "./classifieds.seed";
import { seedCustomers } from "./customers.seed";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedImages } from "./images.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
  await seedTaxonomy(prisma);
  await seedClassifieds(prisma);
  await seedImages(prisma);
  await seedAdmin(prisma);
  await seedCustomers(prisma);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
