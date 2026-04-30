import { put, call, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {GET_EMAILS_START, SEND_EMAIL_START, DELETE_EMAIL, SET_EMAIL_READ} from '../store/emails/types';
import {getEmailsSuccess, deleteEmailSuccess, sendEmailSuccess, getEmails} from '../store/emails/actions';
import {notify} from '../store/notification/actions';
import {getAccountEmails, sendAccountEmail, deleteEmails, setEmailRead} from '../services/api';

function* getEmailUpdates({email, emailAction}:any): SagaIterator {
  try{
    const response = yield call(getAccountEmails, email, emailAction)
    yield put(getEmailsSuccess(response)); 
  }catch(e){
  }  
}

function* sendEmailUpdates({payload}: any): SagaIterator {
  try{
    const response = yield call(sendAccountEmail, payload)
    yield put(notify(response.message));
    yield put(sendEmailSuccess(response.message));
    yield put(getEmails(payload.sender, 'send'));
  }catch(e){
  }  
}

function* deleteEmailUpdates({emailUuids}: any): SagaIterator {
  try{
    const response = yield call(deleteEmails, emailUuids)
    yield put(notify(response.message)); 
    yield put(getEmailsSuccess(response.emails)); 
  }catch(e){
  }  
}

function* setEmailreadUpdates({emailUuid}:any): SagaIterator {
  try{
    const response = yield call(setEmailRead, emailUuid)
    yield put(getEmailsSuccess(response.emails)); 
  }catch(e){
  }
}

export function* watchEmail() {
  yield takeLatest(GET_EMAILS_START, getEmailUpdates)
  yield takeLatest(SEND_EMAIL_START, sendEmailUpdates)
  yield takeLatest(DELETE_EMAIL, deleteEmailUpdates)
  yield takeLatest(SET_EMAIL_READ, setEmailreadUpdates)
}