import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types'
import { setCurrentUser, setError, emailSignInStart } from './user.actions'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapshopFromUserAuth(userAuth) {
  try {
    const userRef = yield createUserProfileDocument(userAuth);
    const userSnapshot = yield userRef.get();
    yield put(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(setError(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshopFromUserAuth(user)
  } catch (error) {
    yield put(setError(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshopFromUserAuth(user)
  } catch (error) {
    yield put(setError(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshopFromUserAuth(userAuth)
  } catch (error) {
    yield (put(setError(error)))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield (put(setCurrentUser(null)));
    yield (put({ type: UserActionTypes.SIGN_OUT_SUCCESS }));
  } catch (error) {
    yield (put(setError(error)));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createUserProfileDocument(user, { displayName });
    yield put(emailSignInStart({ email, password }));
  } catch (error) {
    yield (put(setError(error)));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart)
  ])
}