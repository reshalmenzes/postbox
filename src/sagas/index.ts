import { all, fork } from 'redux-saga/effects';
import { watchEmail } from './email';
import {watchAuth} from './auth';

export default function* rootSaga() {
    yield all([fork(watchEmail), fork(watchAuth)]);
}