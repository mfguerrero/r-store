import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// export const updateCollections = collectionsMap => 

const setLoading = () => ({ type: ShopActionTypes.SET_LOADING });
const setError = (error) => ({ type: ShopActionTypes.SET_ERROR, payload: error });

const setCollections = (collections) => ({
  type: ShopActionTypes.SET_COLLECTIONS,
  payload: collections
});

export const fetchCollectionsAsync = () => {
  return async dispatch => {
    dispatch(setLoading())
    const collectionsRef = firestore.collection('collections');
    try {
      const snapshot = await collectionsRef.get();
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      dispatch(setCollections(collectionsMap))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}


