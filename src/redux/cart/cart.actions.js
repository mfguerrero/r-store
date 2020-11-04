import { CartActionTypes } from './cart.types'

export const toogleCartHidden = () => {
  return {
    type: CartActionTypes.TOGGLE_CART_HIDDEN
  }
}