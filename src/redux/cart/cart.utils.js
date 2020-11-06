export const addItemToCart = (cartItems, cartItemToAdd) => {
  const exist = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
  if (exist) {
    return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - (cartItem.quantity === 1 ? 0 : 1) }
    : cartItem
  )
}




