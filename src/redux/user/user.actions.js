import UserActionTypes from './user.types'

export const googleSingInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START, payload: emailAndPassword
})

export const setCurrentUser = user => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
  }
}

export const setError = error => ({
  type: UserActionTypes.SET_ERROR,
  payload: error
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
})

export const signUpStart = (userData) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userData
})