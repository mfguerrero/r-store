import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';


export const Header = ({ currentUser, dropDownHidden }) => {
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
            <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  dropDownHidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
