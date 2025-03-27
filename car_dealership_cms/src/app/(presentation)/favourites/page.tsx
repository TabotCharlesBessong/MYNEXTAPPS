import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedCard } from "@/components/inventory/classified-card";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

export default async function FavouritesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const validPage = PageSchema.parse(searchParams?.page);

  // get the current page
  const page = validPage ? validPage : 1;

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  const classifieds = await prisma.classified.findMany({
    where: { id: { in: favourites ? favourites.ids : [] } },
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });

  const count = await prisma.classified.count({
    where: { id: { in: favourites ? favourites.ids : [] } },
  });

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80dvh]">
      <h1 className="text-3xl font-bold mb-6">Your Favourite Classifieds</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {classifieds.map((classified) => {
          return (
            <ClassifiedCard
              key={classified.id}
              classified={classified}
              favourites={favourites ? favourites.ids : []}
            />
          );
        })}
      </div>
      <div className="mt-8 flex">
        <CustomPagination
          baseURL={routes.favourites}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-center",
            paginationPrevious: "",
            paginationNext: "",
            paginationLinkActive: "",
            paginationLink: "border-none active:border",
          }}
        />
      </div>
    </div>
  );
}
