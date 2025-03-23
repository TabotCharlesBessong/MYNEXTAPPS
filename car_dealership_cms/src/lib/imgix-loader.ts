// import { env } from "@/env";
import type { ImageLoaderProps } from "next/image";

interface LoaderProps extends ImageLoaderProps {
  height?: number;
}

export const imgixLoader = ({ src, width, height, quality }: LoaderProps) => {
  const url = new URL(src);

  url.searchParams.set("w", width.toString());

  url.searchParams.set("auto", "format,compress");
  if (height) url.searchParams.set("h", height.toString());
  if (quality) url.searchParams.set("q", quality.toString());

  const path = url.pathname;
  const params = url.searchParams.toString();

  return `${process.env.NEXT_PUBLIC_IMGIX_URL}/${path}?${params}`;
};
