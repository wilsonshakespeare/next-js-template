// This is written at core so that
import { StoreType } from '../definitions/Application';

class ApplicationStore<AppState = {}> {
  public static getInstance<AppState = {}>(): ApplicationStore<AppState> {
    if (!ApplicationStore.instance) {
      ApplicationStore.instance = new ApplicationStore<AppState>();
    }
    return ApplicationStore.instance as ApplicationStore<AppState>;
  }

  private static instance: ApplicationStore;
  private _store: StoreType<AppState> = null;
  private constructor() {
    this._store = null;
  }

  public setStore(store: StoreType<AppState>) {
    this._store = store;
  }

  public get store(): StoreType<AppState> {
    return this._store;
  }
}

export default ApplicationStore;
