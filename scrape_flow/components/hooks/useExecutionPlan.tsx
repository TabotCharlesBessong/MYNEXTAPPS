import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan"
import { AppNode } from "@/types/appNode"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import useFlowValidation from "./useFlowValidation"

const useExecutionPlan = () => {
  const {toObject} = useReactFlow()
  const {setInvalidInputs,clearErrors} = useFlowValidation()

  const generateExecutionPlan = useCallback(() => {
    const {nodes,edges} = toObject()
    const {executionPlan,error} = FlowToExecutionPlan(nodes as AppNode[],edges)
    return executionPlan
  },[toObject])

  return generateExecutionPlan
}

export default useExecutionPlan