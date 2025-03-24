"use client";

import type { ClassifiedImages } from "@/config/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ImgixImage } from "../ui/imgix-image";
// import { ImgixImage } from "../ui/imgix-image";

interface SortableItemProps {
  index: number;
  item: ClassifiedImages[number];
  remove: (index: number) => void;
  progress?: number;
}

export const SortableItem = (props: SortableItemProps) => {
  const { index, item, remove, progress } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div className="group relative">
      <Button
        type="button"
        size="icon"
        data-no-dnd="true"
        draggable="false"
        onClick={() => remove(index)}
        className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity right-1.5 top-1.5 h-6 w-6 duration-200"
      >
        <XIcon />
      </Button>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-move"
        style={style}
      >
        <div className="relative overflow-hidden rounded-lg">
          {item.done ? (
            <div className="h-full rounded-lg">
              <ImgixImage
                alt={item.alt}
                src={item.src}
                width={240}
                height={160}
                quality={25}
                blurDataURL={item.base64 as string}
                placeholder={item.base64 ? "blur" : "empty"}
                className="aspect-3/2 object-cover"
              />

              <CheckCircle className="absolute w-4 h-4 text-black opacity-100 transition-opacity duration-200 group-hover:opacity-0 bottom-2 right-2" />
            </div>
          ) : (
            <div className="aspect-3/2 flex flex-col items-center justify-center rounded-lg bg-muted">
              <span>{progress || 0}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
