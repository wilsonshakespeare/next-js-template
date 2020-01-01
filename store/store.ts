// TODO: Move to core
import createSagaMiddleware, { END } from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { ApplicationState, CombinedReducer, IStoreType } from '@definitions/Application.d';
import rootInitialState from './initial-state';
import rootReducer from './reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; // Add more middlewares here if needed

const bindMiddleware = middleware => {
  if (process.env.API_ENV !== 'production') {
    // @ts-ignore
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = (reducer: CombinedReducer, initialState = rootInitialState) =>
  createStore(reducer, initialState, bindMiddleware(middlewares));

/**
 * The 'store' for server-side has got to be created for EVERY request
 * The 'store' for client-side would be the same throughout SPA
 *
 * Hence, the purpose of this function is so that when the request hit the server,
 * this is the function for the server to re-create a new 'store' instance
 */

const configuredStore = (initialState: ApplicationState) => {
  const store: IStoreType = makeStore(rootReducer, initialState);

  /**
   * 'runSaga' is used to rerun the rootSaga on the client
   * 'saga' is used to await the rootSaga task before sending the result back to client
   */
  store.runSaga = () => {
    // Avoid running twice
    if (store.saga) return;
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
    // Avoid running twice
    if (!store.saga) return;
    // Redux Saga has an END action to stop all saga watchers
    store.dispatch(END);
    // Redux Saga also has an async saga.done function to wait for all saga tasks to complete
    await store.saga.done;
    // By combining END action + saga.done, we can achieve async callback of saga tasks
    store.saga = null;
  };

  store.execSagaTasks = async (isServer: boolean, tasks: any) => {
    // Run the saga
    store.runSaga();
    // Dispatch saga tasks
    tasks(store.dispatch);
    // Stop running and wait for the saga tasks to complete
    await store.stopSaga();

    if (!isServer) store.runSaga();
  };

  // Run the rootSaga initially
  store.runSaga();

  return store;
};

export default configuredStore;
