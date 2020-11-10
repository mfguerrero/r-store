import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = {
  type: ShopActionTypes.SET_FETCH_COLLECTION_START
};

export const setError = (error) => ({
  type: ShopActionTypes.SET_ERROR,
  payload: error
});

export const setCollections = (collections) => ({
  type: ShopActionTypes.SET_COLLECTIONS,
  payload: collections
});



