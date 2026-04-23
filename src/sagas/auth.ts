import { call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
// ... your other imports

function* loginSaga(credentials: any): SagaIterator {   // ✅ add `: SagaIterator`
  try {
    const currentUser = yield call(login, credentials);
    yield put(signInSuccess(currentUser));
  } catch (e) {                                          // ✅ catch `e`, not `{message}`
    const message = (e as Error).message;
    yield put(notifyError(message || ANY_ERROR_TEXT));
  }
}

function* signoutSaga(currentUser: any): SagaIterator { // ✅ add `: SagaIterator`
  try {
    const response = yield call(signout, currentUser);
    yield put(signOutSuccess());
  } catch (e) {                                          // ✅ catch `e`, not `{message}`
    const message = (e as Error).message;
    yield put(notifyError(message || ANY_ERROR_TEXT));
  }
}
