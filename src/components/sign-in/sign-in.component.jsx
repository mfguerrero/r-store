import React, { Component } from 'react'


import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'

import './sign-in.styles.scss'

export class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async e => {

    e.preventDefault();

    const { email, password } = this.state;
    try {
      auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }

    this.setState({ email: '', password: '' });
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sin in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput type="email" name="email" value={this.state.email} required
            handleChange={this.handleChange}
            label="email"
          />
          <FormInput type="password" name="password" value={this.state.password} required
            handleChange={this.handleChange}
            label="password"
          />
          <div className="buttons">
            <CustomButton type="submit" >Sing In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sing In with Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}


export default SignIn