"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegistery } from "@/lib/workflow/task/Registry";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import {
  CoinsIcon,
  CopyIcon,
  GripHorizontalIcon,
  TrashIcon,
} from "lucide-react";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const task = TaskRegistery[taskType];
  const { deleteElements,getNode,addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} /> {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <Button
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <TrashIcon size={16} />
              </Button>
              <Button onClick={() => {
                const node = getNode(nodeId) as AppNode
                const newX = node.position.x
                const newY = node.position.y
                const newNode = CreateFlowNode(node.data.type,{
                  x: newX + 400,
                  y: newY + 250,
                })
                addNodes([newNode])

              }} variant={"ghost"} size={"icon"}>
                <CopyIcon size={16} />
              </Button>
            </>
          )}
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
