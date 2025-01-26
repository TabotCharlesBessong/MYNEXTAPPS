import { AppNode } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistery } from "./task/Registry";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
};

export const FlowToExecutionPlan = (
  nodes: AppNode[],
  egdes: Edge[]
): FlowToExecutionPlanType => {
  const entryPoint = nodes.find(
    (node) => TaskRegistery[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("TODO: HANDLE THIS ERROR");
  }

  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id)

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already exists in execution plan
        continue;
      }
      const invalidInputs = getInvalidInputs(currentNode, egdes, planned);
      if (!invalidInputs.length) {
        const incomers = getIncomers(currentNode, nodes, egdes);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.error("Invalid inputs", currentNode, invalidInputs);
          throw new Error("TODO: Handle this error");
        } else {
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }
    for (const node of nextPhase.nodes){
      planned.add(node.id)
    }
    executionPlan.push(nextPhase)
  }
  return { executionPlan };
};

const getInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];

  const inputs = TaskRegistery[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      continue;
    }
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputEdgedByOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutputs =
      input.required &&
      inputEdgedByOutput &&
      planned.has(inputEdgedByOutput.source);

    if (!requiredInputProvidedByVisitedOutputs) {
      // invalidInputs.push(input);
      continue
    }else if (!input.required){
      if (!inputEdgedByOutput) continue
      if (inputEdgedByOutput && planned.has(inputEdgedByOutput.source)){
        continue
      }
    }
    invalidInputs.push(input.name)
  }

  return invalidInputs
};
