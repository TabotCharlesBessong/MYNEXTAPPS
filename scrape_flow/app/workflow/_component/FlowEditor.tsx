"use client";

import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DragEvent, useCallback, useEffect } from "react";
import NodeComponent from "./nodes/NodeComponent";
import { AppNode } from "@/types/appNode";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistery } from "@/lib/workflow/task/Registry";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {
  padding: 1,
};

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      console.log(flow);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
  }, [screenToFlowPosition,setNodes]);

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("onConnect", connection);
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));

      console.log("onConnection", connection);

      if (!connection.targetHandle) return;
      console.log("onConnection", connection);
      console.log("Nodes here", nodes[1]);
      const node = nodes.find((nd) => nd.id === connection.target);
      console.log("checking node", node);
      if (!node) return;
      console.log("checking node", node);
      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: "",
        },
      });
      console.log("updating");
      console.log("Updated node data", node.id);
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback((connection:Edge | Connection) => {
    // no self connecton allowed
    if (connection.source === connection.target) return false;
    // same task param type
    const source = nodes.find(n => n.id === connection.source)
    const target = nodes.find(n => n.id === connection.target)
    if(!source || !target) return false;
    const sourceTask = TaskRegistery[source.data.type]
    const targetTask = TaskRegistery[target.data.type]

    const output = sourceTask.outputs.find(o => o.name === connection.sourceHandle)
    const input = sourceTask.inputs.find(o => o.name === connection.targetHandle)

    if(input?.name === output?.name) return false

    console.log("DEBUG",{output, input})

    const hasCycle = (node:AppNode,visited= new Set()) => {
      if(visited.has(node.id)) return false
      visited.add(node.id)
      for(const outgoer of getOutgoers(node,nodes,edges)) {
        if (outgoer.id === connection.source) return true
        if (hasCycle(outgoer,visited)) return true
      }
      return false
    }
    const detectedCycle = hasCycle(target)
    return !detectedCycle
  },[nodes,edges])

  console.log("nodes", nodes);
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
