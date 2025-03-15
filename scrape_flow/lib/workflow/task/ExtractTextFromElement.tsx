"use client";

import { TaskParamTypes, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  credits:2,
  inputs: [
    {
      name: "Html",
      type: TaskParamTypes.STRING,
      required: true,
      variant:"textarea"
    },
    {
      name: "Selector",
      type: TaskParamTypes.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamTypes.STRING,
    },
  ],
} satisfies WorkflowTask

const ExtractTextFromElement = () => {
  return <div>ExtractTextFromElement</div>;
};

export default ExtractTextFromElement;
