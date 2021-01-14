import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';

import CheckoutItem from './checkout-item.component';

const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  } 
`;

const CheckoutItemContainer = ({ cartItem, removeItem, addItem, clearItem }) => (
  <CheckoutItem 
    cartItem={ cartItem } 
    removeItem={ item => removeItem({ variables: { item }}) } 
    addItem={ item => addItem({ variables: { item }}) } 
    clearItem={ item => clearItem({ variables: { item }}) } 
  />
)

export default flowRight(
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItem' }),
  graphql(ADD_ITEM_TO_CART, { name: 'addItem' }),
  graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItem' }),
)(CheckoutItemContainer);