import React from 'react'
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

import { selectItemsCount } from '../../redux/cart/cart.selectors';
import { toogleCartHidden } from '../../redux/cart/cart.actions';


const CartIcon = ({ toogleCartHidden, itemsCount }) => {

  return (
    <div className="cart-icon" onClick={toogleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemsCount}</span>
    </div>
  )
}

const mapStateToProps = state => ({
  itemsCount: selectItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
  toogleCartHidden: () => dispatch(toogleCartHidden())
});



export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
