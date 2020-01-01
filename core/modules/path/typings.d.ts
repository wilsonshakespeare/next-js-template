export interface PathState {
  prevPathname: string;
  currPathname: string;
}

export type ReducerFunction = (state: PathState, action: any) => PathState;
