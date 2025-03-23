import type { ClassifiedAI } from "@/app/schemas/classified-ai.schema";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import type { Make } from "@prisma/client";
import {
  CarFrontIcon,
  CarIcon,
  CheckIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";

export type StreamableSkeletonProps = Partial<Omit<ClassifiedAI, "make">> & {
  make?: Make;
  done?: boolean;
};

export const StreamableSkeleton = (props: StreamableSkeletonProps) => {
  const {
    image,
    title,
    odoReading,
    fuelType,
    transmission,
    description,
    bodyType,
    seats,
    ulezCompliance,
    doors,
    colour,
    vrm,
    odoUnit,
    make,
    done,
  } = props;
  return (
    <div className="flex flex-col container mx-auto py-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          {image ? (
            <Image
              src={image}
              alt={title || "Vehicle Image"}
              width={600}
              height={400}
              className="rounded-lg aspect-3/2 object-cover"
            />
          ) : (
            <Skeleton className="aspect-3/2 w-full" />
          )}
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {make ? (
              <Image
                src={make.image}
                alt={make.name}
                width={80}
                height={64}
                className="mr-4"
              />
            ) : !done ? (
              <Skeleton className="w-20 h-16 mr-4" />
            ) : null}
            <div>
              {title ? (
                <h1 className="text-2xl font-bold">{title}</h1>
              ) : (
                <Skeleton className="h-8 w-64 mb-2" />
              )}
            </div>
          </div>
          <div className="my-4 flex flex-wrap items-center gap-2">
            {odoReading && odoUnit ? (
              <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 5 py-0 5 rounded-md">
                {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
              </span>
            ) : !done ? (
              <Skeleton className="h-6 w-16 rounded-md" />
            ) : null}
            {fuelType ? (
              <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 5 py-0 5 rounded-md">
                {formatFuelType(fuelType)}
              </span>
            ) : !done ? (
              <Skeleton className="h-6 w-16 rounded-md" />
            ) : null}
            {colour ? (
              <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 5 py-0 5 rounded-md">
                {formatColour(colour)}
              </span>
            ) : !done ? (
              <Skeleton className="h-6 w-16 rounded-md" />
            ) : null}
            {transmission ? (
              <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 5 py-0 5 rounded-md">
                {formatTransmission(transmission)}
              </span>
            ) : !done ? (
              <Skeleton className="h-6 w-16 rounded-md" />
            ) : null}
          </div>
          {description ? (
            <p className="text-gray-600 mb-4">{description}</p>
          ) : (
            <Skeleton className="h-20 w-full mb-4" />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              {ulezCompliance === "EXEMPT" ? (
                <CheckIcon className="w-6 h-6 mx-auto text-green-500" />
              ) : (
                <XIcon className="w-6 h-6 mx-auto text-red-500" />
              )}
              {ulezCompliance ? (
                <p className="text-sm font-medium mt-2">
                  {formatUlezCompliance(ulezCompliance)}
                </p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <Fingerprint className="w-6 h-6 mx-auto text-zinc-400" />
              {vrm ? (
                <p className="text-sm font-medium mt-2">{vrm}</p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <CarIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {bodyType ? (
                <p className="text-sm font-medium mt-2">
                  {formatBodyType(bodyType)}
                </p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <FuelIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {fuelType ? (
                <p className="text-sm font-medium mt-2">
                  {formatFuelType(fuelType)}
                </p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <PowerIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {transmission ? (
                <p className="text-sm font-medium mt-2">
                  {formatTransmission(transmission)}
                </p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <GaugeIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {odoReading && odoUnit ? (
                <p className="text-sm font-medium mt-2">
                  {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
                </p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <UsersIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {seats ? (
                <p className="text-sm font-medium mt-2">{seats}</p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-xs p-4 text-center">
              <CarFrontIcon className="w-6 h-6 mx-auto text-zinc-400" />
              {doors ? (
                <p className="text-sm font-medium mt-2">{doors}</p>
              ) : !done ? (
                <Skeleton className="h-4 w-16 mx-auto mt-2" />
              ) : (
                <p className="text-sm font-medium mt-2">UNKNOWN</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
