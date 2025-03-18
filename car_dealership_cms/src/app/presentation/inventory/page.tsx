import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classifieds-list";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";

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
  // console.log(classifieds);
  const count = await prisma.classified.count()
  
  return (
    <div className="grid grid-cols-1">
      <ClassifiedsList classifieds={await classifieds} />
    </div>
  )
}