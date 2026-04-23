import { all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchEmail } from './email';
import {watchAuth} from './auth';

export default function* rootSaga(): SagaIterator {
    return yield all([watchEmail(), watchAuth()]);
}
