import React from 'react';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import CheckoutPage from './checkout.component';

const GET_TOTAL = gql`
  {
    total @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CheckoutContainer = ({cartItems: { cartItems }, total: { total }}) => (
  <CheckoutPage total={ total } cartItems={ cartItems } /> 
);

export default flowRight(
  graphql(GET_CART_ITEMS, { name: 'cartItems'}),
  graphql(GET_TOTAL, { name: 'total' }),
)(CheckoutContainer);