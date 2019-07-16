import { all } from 'redux-saga/effects';

import gameSagas from './game';

export default function* rootSaga() {
  yield all([
    ...gameSagas,
  ]);
}
