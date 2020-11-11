import UserActionTypes from './user.types';

const initialState = {
  currentUser: null,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }
    case UserActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}