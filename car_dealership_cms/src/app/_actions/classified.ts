"use server";
import type { StreamableSkeletonProps } from "@/components/admin/classifieds/streamable-skeleton";
import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { generateThumbHashFromSrcUrl } from "@/lib/thumbhash-server";
import { CurrencyCode } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";
import { randomInt } from "node:crypto";
import slugify from "slugify";
import { createPngDataUri } from "unlazy/thumbhash";
import type { UpdateClassifiedType } from "../schemas/classified.schema";
import { auth } from "../auth";

export const createClassifiedAction = async (data: StreamableSkeletonProps) => {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };
  let success = false;
  let classifiedId: number | null = null;

  try {
    const make = await prisma.make.findUnique({
      where: { id: data.makeId as number },
    });

    const model = await prisma.model.findUnique({
      where: { id: data.modelId as number },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (data?.modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: data.modelVariantId as number },
      });

      if (modelVariant) title = `${title} ${modelVariant.name}`;
    }

    let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`);

    const slugLikeFound = await prisma.classified.count({
      where: { slug: { contains: slug, mode: "insensitive" } },
    });

    if (slugLikeFound) {
      slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`);
    }

    const thumbhash = await generateThumbHashFromSrcUrl(data.image as string);
    const uri = createPngDataUri(thumbhash);

    const classified = await prisma.classified.create({
      data: {
        slug,
        title,
        year: Number(data.year),
        makeId: data.makeId as number,
        modelId: data.modelId as number,
        ...(data.modelVariantId && {
          modelVariantId: data.modelVariantId as number,
        }),
        vrm: data?.vrm ? data.vrm : null,
        price: 0,
        currency: CurrencyCode.GBP,
        odoReading: data.odoReading,
        odoUnit: data.odoUnit,
        fuelType: data.fuelType,
        bodyType: data.bodyType,
        colour: data.colour,
        transmission: data.transmission,
        ulezCompliance: data.ulezCompliance,
        description: data.description,
        doors: data.doors,
        seats: data.seats,
        images: {
          create: {
            isMain: true,
            blurhash: uri,
            src: data.image as string,
            alt: title,
          },
        },
      },
    });

    if (classified) {
      classifiedId = classified.id;
      success = true;
    }
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }

  if (success && classifiedId) {
    revalidatePath(routes.admin.classifieds);
    redirect(routes.admin.editClassified(classifiedId));
  } else {
    return { success: false, message: "Failed to create classified" };
  }
};

export const updateClassifiedAction = async (data: UpdateClassifiedType) => {
  const session = await auth();
  if (!session) forbidden();

  let success = false;

  try {
    const makeId = Number(data.make);
    const modelId = Number(data.model);
    const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null;

    const make = await prisma.make.findUnique({
      where: { id: makeId as number },
    });

    const model = await prisma.model.findUnique({
      where: { id: modelId as number },
    });

    let title = `${data.year} ${make?.name} ${model?.name}`;

    if (modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: modelVariantId },
      });

      if (modelVariant) title = `${title} ${modelVariant.name}`;
    }

    const slug = slugify(`${title} ${data.vrm}`);

    const [classified, images] = await prisma.$transaction(
      async (prisma) => {
        await prisma.image.deleteMany({
          where: { classifiedId: data.id },
        });

        const imagesData = await Promise.all(
          data.images.map(async ({ src }, index) => {
            const hash = await generateThumbHashFromSrcUrl(data.images[0].src);
            const uri = createPngDataUri(hash);
            return {
              classifiedId: data.id,
              isMain: !index,
              blurhash: uri,
              src,
              alt: `${title} ${index + 1}`,
            };
          })
        );

        const images = await prisma.image.createManyAndReturn({
          data: imagesData,
        });

        const classified = await prisma.classified.update({
          where: { id: data.id },
          data: {
            slug,
            title,
            year: Number(data.year),
            makeId,
            modelId,
            ...(modelVariantId && { modelVariantId }),
            vrm: data.vrm,
            price: data.price * 100,
            currency: data.currency,
            odoReading: data.odoReading,
            odoUnit: data.odoUnit,
            fuelType: data.fuelType,
            bodyType: data.bodyType,
            transmission: data.transmission,
            colour: data.colour,
            ulezCompliance: data.ulezCompliance,
            description: data.description,
            doors: data.doors,
            seats: data.seats,
            status: data.status,
            images: { set: images.map((image) => ({ id: image.id })) },
          },
        });

        return [classified, images];
      },
      { timeout: 10000 }
    );

    if (classified && images) success = true;
  } catch (err) {
    console.log({ err });
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Something went wrong" };
  }

  if (success) {
    revalidatePath(routes.admin.classifieds);
    redirect(routes.admin.classifieds);
  } else {
    return { success: false, message: "Failed to update classified" };
  }
};

export const deleteClassifiedAction = async (id: number) => {
  try {
    await prisma.classified.delete({ where: { id } });
    revalidatePath(routes.admin.classifieds);
    return { success: true, message: "Classified deleted" };
  } catch (error) {
    console.log("Error deleting classified: ", { error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};
