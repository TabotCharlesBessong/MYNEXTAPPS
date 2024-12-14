import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface AppNodeData {
  type:TaskType
  [key:string]: any
  inputs:Record<string, string>
}

export interface AppNode extends Node {
  data:AppNodeData
}