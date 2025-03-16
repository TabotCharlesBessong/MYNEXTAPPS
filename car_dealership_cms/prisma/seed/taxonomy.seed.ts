import type { Prisma, PrismaClient } from "@prisma/client";
import { parse } from "csv";
import fs from "node:fs";

type Row = {
  make: string;
  model: string;
  variant: string | undefined;
  yearStart: number;
  yearEnd: number;
};

const BATCH_SIZE = 100;

export async function seedTaxonomy(prisma: PrismaClient) {
  const rows = await new Promise<Row[]>((resolve, reject) => {
    const eachRow: Row[] = [];

    fs.createReadStream("taxonomy.csv")
      .pipe(parse({ columns: true }))
      .on("data", (row: { [index: string]: string }) => {
        eachRow.push({
          make: row.Make,
          model: row.Model,
          variant: row.Model_Variant || undefined,
          yearStart: Number(row.Year_Start),
          yearEnd: row.Year_End
            ? Number(row.Year_End)
            : new Date().getFullYear(),
        });
      })
      .on("error", (error) => {
        console.log({ error });
        reject(error);
      })
      .on("end", () => {
        resolve(eachRow);
      });
  });

  console.log(rows);

  type MakeModelMap = {
    [make: string]: {
      [model: string]: {
        variants: {
          [variant: string]: {
            yearStart: number;
            yearEnd: number;
          };
        };
      };
    };
  };

  const result: MakeModelMap = {};

  for (const row of rows) {
    if (!result[row.make]) {
      result[row.make] = {};
    }

    if (!result[row.make][row.model]) {
      result[row.make][row.model] = {
        variants: {},
      };
    }

    if (row.variant) {
      result[row.make][row.model].variants[row.variant] = {
        yearStart: row.yearStart,
        yearEnd: row.yearEnd,
      };
    }
  }

  console.log({ result });

  const makePromises = Object.entries(result).map(([name]) => {
    return prisma.make.upsert({
      where: {
        name,
      },
      update: {
        name,
        image: `https://vl.imgix.net/img/${name
          .replace(/\s+/g, "-")
          .toLowerCase()}-logo.png?auto=format,compress`,
      },
      create: {
        name,
        image: `https://vl.imgix.net/img/${name
          .replace(/\s+/g, "-")
          .toLowerCase()}-logo.png?auto=format,compress`,
      },
    });
  });

  const makes = await Promise.all(makePromises);
  console.log(`Seeded db with ${makes.length} makes 🌱`);

  const modelPromises: Prisma.Prisma__ModelClient<unknown, unknown>[] = [];

  for (const make of makes) {
    for (const model in result[make.name]) {
      modelPromises.push(
        prisma.model.upsert({
          where: {
            makeId_name: {
              name: model,
              makeId: make.id,
            },
          },
          update: {
            name: model,
          },
          create: {
            name: model,
            make: { connect: { id: make.id } },
          },
        })
      );
    }
  }

  async function insertInBatches<TUpsertArgs>(
    items: TUpsertArgs[],
    batchSize: number,
    insertFunction: (batch: TUpsertArgs[]) => void
  ) {
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await insertFunction(batch);
    }
  }

  await insertInBatches<Prisma.Prisma__ModelClient<unknown, unknown>>(
    modelPromises,
    BATCH_SIZE,
    async (batch) => {
      const models = await Promise.all(batch);
      console.log(`Seeded batch of ${models.length} models 🌱`);
    }
  );

  const variantPromises: Prisma.Prisma__ModelVariantClient<unknown, unknown>[] =
    [];

  for (const make of makes) {
    const models = await prisma.model.findMany({
      where: { makeId: make.id },
    });

    for (const model of models) {
      for (const [variant, year_range] of Object.entries(
        result[make.name][model.name].variants
      )) {
        variantPromises.push(
          prisma.modelVariant.upsert({
            where: {
              modelId_name: {
                name: variant,
                modelId: model.id,
              },
            },
            update: {
              name: variant,
            },
            create: {
              name: variant,
              yearStart: year_range.yearStart,
              yearEnd: year_range.yearEnd,
              model: { connect: { id: model.id } },
            },
          })
        );
      }
    }
  }

  await insertInBatches<Prisma.Prisma__ModelVariantClient<unknown, unknown>>(
    variantPromises,
    BATCH_SIZE,
    async (batch) => {
      const variants = await Promise.all(batch);
      console.log(`Seeded batch of ${variants.length} variants 🌱`);
    }
  );
}
