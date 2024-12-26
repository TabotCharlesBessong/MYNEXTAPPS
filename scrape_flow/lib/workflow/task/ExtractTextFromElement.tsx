"use client";

import { TaskParamTypes, TaskType } from "@/types/task";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      types: TaskParamTypes.STRING,
      required: true,
    },
    {
      name: "Selector",
      types: TaskParamTypes.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      types: TaskParamTypes.STRING,
    },
  ],
};

const ExtractTextFromElement = () => {
  return <div>ExtractTextFromElement</div>;
};

export default ExtractTextFromElement;
