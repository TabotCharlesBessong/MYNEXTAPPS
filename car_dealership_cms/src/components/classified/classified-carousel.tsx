"use client";

import { imgixLoader } from "@/lib/imgix-loader";
import type { Image as PrismaImage } from "@prisma/client";
import FsLightbox from "fslightbox-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/virtual";
import { EffectFade, Navigation, Thumbs, Virtual } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { SwiperButtons } from "../shared/swiper-button";
// import { ImgixImage } from "../ui/imgix-image";
import { CarouselSkeleton } from "./carousel-skeleton";
import Image from "next/image";
import { ImgixImage } from "../ui/imgix-image";

interface ClassifiedCarouselProps {
  images: PrismaImage[];
}

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <CarouselSkeleton />,
});

const SwiperThumb = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  {
    ssr: false,
    loading: () => null,
  }
);

export const ClassifiedCarousel = ({ images }: ClassifiedCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const setSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleImageClick = useCallback(() => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: activeIndex,
    });
  }, [lightboxController.toggler, activeIndex]);

  const sources = images.map((image) =>
    imgixLoader({ src: image.src, width: 2400, quality: 100 })
  );

  return (
    <>
      <FsLightbox
        toggler={lightboxController.toggler}
        sourceIndex={lightboxController.sourceIndex}
        sources={sources}
        type="image"
      />
      <div className="relative">
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          effect="fade"
          spaceBetween={10}
          fadeEffect={{ crossFade: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[EffectFade, Navigation, Thumbs, Virtual]}
          virtual={{
            addSlidesAfter: 8,
            enabled: true,
          }}
          className="aspect-3/2"
          onSlideChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id} virtualIndex={index}>
              <ImgixImage
                blurDataURL={image.blurhash}
                placeholder="blur"
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                quality={45}
                className="aspect-3/2 object-cover rounded-md cursor-pointer"
                onClick={handleImageClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperButtons
          prevClassName="left-4 bg-white"
          nextClassName="right-4 bg-white"
        />{" "}
      </div>
      <SwiperThumb
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs, EffectFade]}
      >
        {images.map((image) => (
          <SwiperSlide
            className="relative mt-2 h-fit w-full cursor-grab"
            key={image.id}
          >
            <ImgixImage
              className="object-cover aspect-3/2 rounded-md"
              width={150}
              height={100}
              src={image.src}
              alt={image.alt}
              quality={1}
              placeholder="blur"
              blurDataURL={image.blurhash}
            />
          </SwiperSlide>
        ))}
      </SwiperThumb>
    </>
  );
};
