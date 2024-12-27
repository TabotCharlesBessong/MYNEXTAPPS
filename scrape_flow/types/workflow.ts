import { LucideProps } from "lucide-react";
import { FC } from "react";
import { TaskParam, TaskType } from "./task";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DELETED = "DELETED",
}

export type WorkflowTask = {
  label: string;
  icon: FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};
