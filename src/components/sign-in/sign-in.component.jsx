import React, { useState } from 'react'
import { connect } from 'react-redux';

import { googleSingInStart, emailSignInStart } from '../../redux/user/user.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'


import './sign-in.styles.scss'

export const SignIn = ({ googleSingInStart, emailSignInStart }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    emailSignInStart(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput type="email" name="email" value={email} required
          handleChange={e => setEmail(e.target.value)}
          label="email"
        />
        <FormInput type="password" name="password" value={password} required
          handleChange={e => setPassword(e.target.value)}
          label="password"
        />
        <div className="buttons">
          <CustomButton type="submit" >Sign In</CustomButton>
          <CustomButton type="button" onClick={googleSingInStart} isGoogleSignIn >Sign In with Google</CustomButton>
        </div>
      </form>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  googleSingInStart: () => dispatch(googleSingInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)