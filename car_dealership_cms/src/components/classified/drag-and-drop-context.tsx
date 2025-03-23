"use client";

import type { ClassifiedImages } from "@/config/types";
import {
  type Active,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { type JSX, useCallback, useMemo, useState } from "react";
import { SortableOverlay } from "./sortable-overlay";
type ClassifiedImage = ClassifiedImages[number];

interface DragAndDropContextProps {
  replace: (items: ClassifiedImages) => void;
  items: ClassifiedImages;
  renderItem: (item: ClassifiedImage) => JSX.Element;
}

export const DragAndDropContext = (props: DragAndDropContextProps) => {
  const { replace, items, renderItem } = props;

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [activeId, items]
  );

  const handleDragStart = useCallback(({ active }: { active: Active }) => {
    setActiveId(active.id as number);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) {
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const overIndex = items.findIndex(({ id }) => id === over.id);
        const newItems = arrayMove(items, activeIndex, overIndex);
        replace(newItems);
      }
      setActiveId(null);
    },
    [items, replace]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <SortableContext items={items.map(({ id }) => id as number)}>
          {items.map((item) => renderItem(item))}
        </SortableContext>
      </div>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
};
