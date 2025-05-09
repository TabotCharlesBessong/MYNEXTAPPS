"use client";

import type { ClassifiedWithImages } from "@/config/types";
import dynamic from "next/dynamic";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ClassifiedCard } from "../inventory/classified-card";
import { ClassifiedCardSkeleton } from "../inventory/classified-card-skeleton";
import { SwiperButtons } from "../shared/swiper-button";

interface CarouselProps {
  classifieds: ClassifiedWithImages[];
  favourites: number[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <ClassifiedCardSkeleton key={i} />
      ))}
    </div>
  ),
});

export const LatestArrivalsCarousel = (props: CarouselProps) => {
  const { classifieds, favourites } = props;

  return (
    <div className="mt-8 relative">
      <Swiper
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
      >
        {classifieds.map((classified) => {
          return (
            <SwiperSlide key={classified.id}>
              <ClassifiedCard classified={classified} favourites={favourites} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperButtons
        prevClassName="-left-16 border border-2 border-border hidden lg:flex"
        nextClassName="-right-16 border border-2 border-border hidden lg:flex"
      />
    </div>
  );
};
