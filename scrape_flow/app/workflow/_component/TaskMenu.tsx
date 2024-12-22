"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistery } from "@/lib/workflow/task/Registry";
import { TaskType } from "@/types/task";
import React from "react";

const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4">
      <Accordion type="multiple" className="w-full" defaultValue={["extraction"]} >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default TaskMenu;

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistery[taskType];
  const onDragStart = (event:React.DragEvent,type:TaskType) => {
    event.dataTransfer.setData("application/reactflow",type)
    event.dataTransfer.effectAllowed = "move";
  }
  return (
    <Button
      variant={"secondary"}
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(event) => onDragStart(event,taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}
