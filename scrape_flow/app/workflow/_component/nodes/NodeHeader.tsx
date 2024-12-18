"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistery } from "@/lib/workflow/task/Registry";
import { TaskType } from "@/types/task";
import { CoinsIcon, GripHorizontalIcon } from "lucide-react";
import React from "react";

const NodeHeader = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistery[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEnteryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} /> TODO
          </Badge>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripHorizontalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
