import { put, call, take, takeLatest} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {START_LOGIN, START_SIGNOUT} from '../store/auth/types';
import {signInSuccess, signOutSuccess} from '../store/auth/actions';
import {notifyError, notify} from '../store/notification/actions';
import {login, signout} from '../services/api';
import {Credentials, EmailCreation, User} from '../types'

const ANY_ERROR_TEXT = 'Something went wrong, please try again';

function* loginUpdates({credentials}: any): SagaIterator {
  try{
    const currentUser = yield call(login, credentials)
    yield put(signInSuccess(currentUser));
  }catch(e){
    const message = (e as Error).message;
    yield put(notifyError(message || ANY_ERROR_TEXT));
  }  
}

function* signOutUpdates({currentUser}: any): SagaIterator {
  try{
    const response = yield call(signout, currentUser)
    yield put(signOutSuccess()); 
  }catch(e){
    const message = (e as Error).message;
    yield put(notifyError(message || ANY_ERROR_TEXT));
  }  
}

export function* watchAuth() {
  yield takeLatest(START_LOGIN, loginUpdates)
  yield takeLatest(START_SIGNOUT, signOutUpdates)
}
