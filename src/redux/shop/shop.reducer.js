import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  collections: null,
  isLoading: false,
  errorMessage: ''
};

export const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.SET_FETCH_COLLECTION_START:
      return {
        ...state,
        isLoading: true
      }
    case ShopActionTypes.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
        isLoading: false
      }
    case ShopActionTypes.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }
    default:
      return state
  }
}