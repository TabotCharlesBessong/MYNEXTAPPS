"use client";

import { routes } from "@/config/routes";
import { type ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { FavouriteButton } from "./favourite-button";
import Image from "next/image";
import { ImgixImage } from "../ui/imgix-image";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favourites: number[];
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="w-4 h-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(
        classified.odoUnit
      )}`,
    },
    {
      id: "transmission",
      icon: <Cog className="w-4 h-4" />,
      value: classified?.transmission
        ? formatTransmission(classified?.transmission)
        : null,
    },
    {
      id: "fuelType",
      icon: <Fuel className="w-4 h-4" />,
      value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
    },
    {
      id: "colour",
      icon: <Paintbrush2 className="w-4 h-4" />,
      value: classified?.colour ? formatColour(classified.colour) : null,
    },
  ];
};

export const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified, favourites } = props;

  const pathname = usePathname();
  const [isFavourite, setIsFavourite] = useState(
    Array.isArray(favourites) && favourites.includes(classified.id)
  );

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) setIsVisible(false);
  }, [isFavourite, pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white relative rounded-md shadow-md overflow-hiddem flex flex-col"
        >
          <div className="aspect-3/2 relative">
            <Link href={routes.singleClassified(classified.slug)}>
              <ImgixImage
                src={classified.images[0]?.src}
                alt={classified.images[0]?.alt || "Car Image"}
                layout="fill" // Ensures the image takes up full container space
                objectFit="cover" // Ensures correct cropping
                className="rounded-t-md"
                placeholder="blur"
                blurDataURL={classified.images[0]?.blurhash} // Optional for smoother loading
                quality={50} // Adjust image quality for performance
              />
            </Link>
            <FavouriteButton
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite!}
              id={classified.id}
            />
            <div className="absolute top-2.5 right-3.5 bg-primary text-slate-50 font-bold px-2 py-1 rounded">
              <p className="text-xs lg:text-base xl:text-lg font-semibold">
                {formatPrice({
                  price: classified.price,
                  currency: classified.currency,
                })}
              </p>
            </div>
          </div>
          <div className="p-4 flex flex-col space-y-3">
            <div>
              <Link
                href={routes.singleClassified(classified.slug)}
                className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition-colors hover:text-primary"
              >
                {classified.title}
              </Link>
              {classified?.description && (
                <div className="text-xs md:text-sm xl:text-base text-gray-500 line-clamp-2">
                  <HTMLParser html={classified.description} />
                  &nbsp;{" "}
                  {/* Used for equal spacing across each card in the grid */}
                </div>
              )}

              <ul className="text-xs md:text-sm text-gray-600 xl:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full">
                {getKeyClassifiedInfo(classified)
                  .filter((v) => v.value)
                  .map(({ id, icon, value }) => (
                    <li
                      key={id}
                      className="font-semibold flex xl:flex-col items-center gap-x-1.5"
                    >
                      {icon} {value}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2 w-full">
              <Button
                className="flex-1 transition-colors hover:border-white hover:bg-primary hover:text-white py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                asChild
                variant="outline"
                size="sm"
              >
                <Link
                  href={routes.reserve(
                    classified.slug,
                    MultiStepFormEnum.WELCOME
                  )}
                >
                  Reserve
                </Link>
              </Button>
              <Button
                className="flex-1 py-2 lg:py-2.5 h-full text-xs md:text-sm xl:text-base"
                asChild
                size="sm"
              >
                <Link href={routes.singleClassified(classified.slug)}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
