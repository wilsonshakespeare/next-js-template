import {
  all,
  // @ts-ignore remove comment when being used for saga
  fork,
} from 'redux-saga/effects';

// import sampleSaga from './modules/omdb/saga';

import es6promise from 'es6-promise';

es6promise.polyfill();

function* rootSaga() {
  yield all([]);
}

export default rootSaga;
