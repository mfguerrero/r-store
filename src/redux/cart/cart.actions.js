import { CartActionTypes } from './cart.types'

export const toogleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})

export const clearItem = id => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: id
})

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
})