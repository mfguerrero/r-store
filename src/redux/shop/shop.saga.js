import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionsTypes from './shop.types';
import { setCollections, setError } from './shop.actions'

export function* fetchCollectionsAsync() {
  try {
    const collectionsRef = firestore.collection('collections');
    const snapshot = yield collectionsRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(setCollections(collectionsMap))
  } catch (error) {
    yield put(setError(error.message))
  }
}


export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionsTypes.SET_FETCH_COLLECTION_START,
    fetchCollectionsAsync
  )
}


export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}
