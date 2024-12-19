import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistery } from "@/lib/workflow/task/Registry";
import NodeInputs from "./NodeInputs";
import NodeInput from "./NodeInput";

const NodeComponent = memo((props:NodeProps) => {
  const nodeData = props.data as AppNodeData
  const  task =  TaskRegistery[nodeData.type]
  return <NodeCard nodeId={props.id} isSelected={!!props.selected} >
    <NodeHeader taskType={nodeData.type} />
    <NodeInputs>
      {task.inputs.map((input) => (
        <NodeInput key={input.name} input={input} nodeId={props.id} />
      ))}
    </NodeInputs>
  </NodeCard>
})

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";