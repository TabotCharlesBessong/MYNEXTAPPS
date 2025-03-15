"use client";

import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import React from "react";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan()
  return (
    <Button variant="outline" className="flex items-center gap-2" onClick={() => {
      const plan = generate()
      console.table(plan)
    }} >
      <PlayIcon size={20} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
