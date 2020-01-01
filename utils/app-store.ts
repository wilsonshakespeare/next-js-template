import ApplicationStore from '@core/utils/app-store';
import { ApplicationState } from '@definitions/Application.d';

class Store {
  public static getInstance() {
    return ApplicationStore.getInstance<ApplicationState>();
  }
}

export default Store;
