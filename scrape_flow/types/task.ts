export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
}

export enum TaskParamTypes {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export interface TaskParam {
  name: string;
  type: TaskParamTypes;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}
