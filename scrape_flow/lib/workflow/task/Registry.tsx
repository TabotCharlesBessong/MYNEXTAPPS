import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkflowTask } from "@/types/workflow";

type Registery = {
  [K in TaskType]: WorkflowTask & {type: K}
}

export const TaskRegistery:Registery = {
  LAUNCH_BROWSER:LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask
}

// TaskRegistery.LAUNCH_BROWSER