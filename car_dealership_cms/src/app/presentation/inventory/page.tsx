import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedsList } from "@/components/inventory/classifieds-list";
import { DialogFilters } from "@/components/inventory/dialog-filters";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import { Sidebar } from "@/components/inventory/sidebar";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import { Suspense } from "react";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);

  // get the current page
  const page = validPage ? validPage : 1;

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};
export default async function InventoryPage(props:PageProps) {
  const searchParams = await props.searchParams
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count({
		where: buildClassifiedFilterQuery(searchParams),
	});
  const sourceId = await getSourceId()
  const favourites = (await redis.get<Favourites>(sourceId ?? "")) ?? [];
  const favouriteIds: number[] = Array.isArray(favourites) ? favourites : [];
  const minMaxResult = await prisma.classified.aggregate({
		where: { status: ClassifiedStatus.LIVE },
		_min: {
			year: true,
			price: true,
			odoReading: true,
		},
		_max: {
			price: true,
			year: true,
			odoReading: true,
		},
	});

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);
  
  return (
		<div className="flex">
			<Sidebar minMaxValues={minMaxResult} searchParams={searchParams} />

			<div className="flex-1 p-4 bg-white">
				<div className="flex space-y-2 items-center justify-between pb-4 -mt-1">
					<div className="flex justify-between items-center w-full">
						<h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
							We have found {count} classifieds
						</h2>
						<DialogFilters
							minMaxValues={minMaxResult}
							count={count}
							searchParams={searchParams}
						/>
					</div>
					<CustomPagination
						baseURL={routes.inventory}
						totalPages={totalPages}
						styles={{
							paginationRoot: "justify-end hidden lg:flex",
							paginationPrevious: "",
							paginationNext: "",
							paginationLink: "border-none active:border text-black",
							paginationLinkActive: "",
						}}
					/>
				</div>

				<Suspense fallback={<InventorySkeleton />}>
					<ClassifiedsList
						classifieds={classifieds}
						favourites={favourites ? favouriteIds : []}
					/>
				</Suspense>

				<CustomPagination
					baseURL={routes.inventory}
					totalPages={totalPages}
					styles={{
						paginationRoot: "justify-center lg:hidden pt-12",
						paginationPrevious: "",
						paginationNext: "",
						paginationLink: "border-none active:border",
						paginationLinkActive: "",
					}}
				/>
			</div>
		</div>
	);
}