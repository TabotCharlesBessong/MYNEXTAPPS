import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export interface AppNodeData {
  type:TaskType
  [key:string]: any
  inputs:Record<string, string>
}

export interface AppNode extends Node {
  data:AppNodeData
}

export interface ParamProps {
  param: TaskParam;
  value:string
  updateNodeParamValue: (newValue:string) => void;
  disabled?:boolean
}