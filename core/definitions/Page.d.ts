import { NextContext } from 'next';
import { Request } from 'express';
import { StoreType } from './Application.d';

export interface PageContext<AppState = {}> extends NextContext<any, Request> {
  isServer: boolean;
  store: StoreType<AppState>;
}

export interface InitDelegator<PropType, Context extends PageContext> {
  getInitialProps: (context: Context) => any;
  componentDidMount: (props: PropType) => void;
}
