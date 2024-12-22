"use client";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./Common";

const NodeInput = ({ input, nodeId }: { input: TaskParam; nodeId: string }) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      {/* <pre>{JSON.stringify(input, null, 4)}</pre> */}
      <NodeParamField nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
