import { getWorkflowsForUsers } from "@/actions/workflows/getWorkflowsForUsers";
import { waitFor } from "@/lib/helper/waitFor";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "@/app/(dashboard)/workflows/_component/CreateWorkflowDialog";

const UserWorkflows = async () => {
  await waitFor(3000);
  const workflows = await getWorkflowsForUsers();
  if (!workflows) {
    return (
      <Alert>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong, please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-bold text-black dark:text-white">
            No workflow created
          </p>
          <p className="text-sm text-muted-foreground">
            Click the link below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflowa" />
      </div>
    );
  }
  return <div>h</div>;
};

export default UserWorkflows;
