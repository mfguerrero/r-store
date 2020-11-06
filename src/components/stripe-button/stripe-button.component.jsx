import React from 'react'
import StripeCheckOut from 'react-stripe-checkout';

export const StripeCheckoutButton = ({ price }) => {
  const priceInCents = price * 100;
  const stripePublicKey = 'pk_test_51HkdYtKR8vcFd16wpsjOekxMoSnzm81CgBBCF3L83WMbxXkyVtaOqFtySOUgquQ65X7lF3j3JhPGHkJA6pmZSJsS00pRZHm2gi'

  const onToken = token => {
    console.log(token)
    alert("Payment successful")
  }

  return (
    <StripeCheckOut
      label="Pay Now"
      name="R Store"
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceInCents}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={stripePublicKey}
    />
  )
}

export default StripeCheckoutButton;