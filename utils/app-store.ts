import ApplicationStore from '@core/utils/app-store';
import { ApplicationState } from '@definitions/Application.d';

// This is to enable store access with Redux Application State declaration type
class Store {
  public static getInstance() {
    return ApplicationStore.getInstance<ApplicationState>();
  }
}

export default Store;
