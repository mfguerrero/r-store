import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)

export const selectItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((pv, item) => {
    return pv + item.quantity
  }, 0)
)

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((pv, item) => {
    return pv + (item.quantity * item.price)
  }, 0)
)