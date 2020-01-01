export interface ErrorModuleItem {
  displayKey?: string;
  requestName: string; // requestName reference
  status: number; // error status code, 403, 404, 500
  code: string; // custom error code reference if required
  message: string; // message to display
}

export interface ErrorState {
  displayKey?: string; // If exist meaning page will show error
  errors: ErrorModuleItem[];
}

export type ReducerFunction = (state: ErrorState, action: any) => ErrorState;
