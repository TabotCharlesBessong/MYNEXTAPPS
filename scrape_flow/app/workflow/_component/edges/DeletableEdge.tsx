"use client";

import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath,useReactFlow } from "@xyflow/react";
import React from "react";

const DeletableEdge = (props: EdgeProps) => {
  const [edgePath,labelX,labelY] = getSmoothStepPath(props);
  const {setEdges} = useReactFlow()
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div className="" style={{
          position:"absolute",
          transform:`translate(-50%,-50%) translate(${labelX},${labelY})`,
          pointerEvents:"all"
        }} >
          <Button variant={"outline"} className="w-6 h-6 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg" onClick={() => {
            setEdges((edges) => edges.filter((edge) => edge.id !== props.id))
          }} >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DeletableEdge;
