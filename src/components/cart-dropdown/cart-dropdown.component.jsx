import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toogleCartHidden } from '../../redux/cart/cart.actions'
import './cart-dropdown.styles.scss';

export const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      {
        cartItems.length ?
          <div className="cart-items">
            {cartItems.map(item => (<CartItem key={item.id} item={item} />))}
          </div> :
          <span className="empty-message">Your cart is empty</span>
      }
      <CustomButton onClick={() => {
        history.push('/checkout')
        dispatch(toogleCartHidden())
      }}>
        CHECKOUT
      </CustomButton>
    </div>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
