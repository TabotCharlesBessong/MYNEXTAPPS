export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum TaskParamTypes {
  STRING = "STRING",
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
