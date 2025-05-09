"use client";

import { imgixLoader } from "@/lib/imgix-loader";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ImgixImageProps = Omit<ImageProps, "priority" | "loading">;

export const ImgixImage = (props: ImgixImageProps) => {
  const [error, setError] = useState(false);

  if (error) return <Image fetchPriority="high" {...props} />;

  return (
    <ImgixImage
      fetchPriority="high"
      loader={(imgProps) => imgixLoader(imgProps)}
      onError={() => setError(true)}
      {...props}
    />
  );
};
