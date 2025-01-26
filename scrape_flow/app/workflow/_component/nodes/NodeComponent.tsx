import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistery } from "@/lib/workflow/task/Registry";
import NodeInputs from "./NodeInputs";
import NodeInput from "./NodeInput";
import NodeOutputs from "./NodeOutputs";
import NodeOutput from "./NodeOutput";
import { TaskParamTypes } from "@/types/task";
import { Badge } from "lucide-react";

const DEV_MODE  = process.env.NEXT_PUBLIC_DEV_MODE === "true"

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistery[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && (
        <div className="flex items-center justify-between bg-primary p-2 px-4" >
          <Badge>DEV: {props.id}</Badge> <p className="text-lg" >{props.id} </p>
        </div>
      )}
      <NodeHeader nodeId={props.id} taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput
            key={input.name}
            input={{ ...input, type: input.types }}
            nodeId={props.id}
          />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput
            key={output.name}
            output={{ ...output, type: output.name as TaskParamTypes }}
            nodeId={props.id}
          />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
