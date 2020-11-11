import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';

export const Header = ({ currentUser, dropDownHidden, signOutStart }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option" >SHOP</Link>
        <Link to="/contact" className="option" >CONTACT</Link>
        {
          currentUser ?
            <div className="option" onClick={() => signOutStart()}>SIGN OUT</div>
            :
            <Link to="/signin" className="option" >SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {!dropDownHidden && <CartDropdown />}
    </div>
  )
}

Header.propTypes = {
  currentUser: PropTypes.object,
  dropDownHidden: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  dropDownHidden: selectCartHidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
