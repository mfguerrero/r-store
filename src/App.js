import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';


import { setCurrentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import HomePage from './pages/homepage/homepage.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import './App.css';


class App extends React.Component {

  unsubscribeFromAuth = null
  unsubscribeFromOnSnapshot = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        this.unsubscribeFromOnSnapshot = userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });

      }
      else {
        this.props.setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromOnSnapshot();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
