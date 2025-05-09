import { ClassifiedView } from "@/components/classified/classified-view";
import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { ClassifiedStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export default async function ClassifiedPage(props: PageProps) {
  const params = await props?.params;

  const slug = decodeURIComponent(params?.slug as string);

  if (!slug) notFound();

  const classified = await prisma.classified.findUnique({
    where: { slug },
    include: { make: true, images: true },
  });

  if (!classified) notFound();

  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(classified.slug));
  }

  return <ClassifiedView {...classified} />;
}
