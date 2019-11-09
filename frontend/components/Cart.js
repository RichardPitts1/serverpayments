import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Supreme from './styles/Supreme';
import CartItem from './CartItem'
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import User from './User'

// So you can use adopt, an npm, to make it where you do not have to wrap multiple queries, mutations, and users.

// me.cart.length === 1 ? '' : 's' == Badass logic for if you have singular/plural constructs

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

// So the client part is saying don't go to the graphQL server, go to the client in local state
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

const Cart = () => (
  <User>
    {({ data: { me } }) => {
      if(!me) return null;
      return (


  <Mutation mutation={TOGGLE_CART_MUTATION}>{(toggleCart) => (
  <Query query={LOCAL_STATE_QUERY}>
    {({data}) => console.log(data) || (
  <CartStyles open={data.cartOpen}>
    <header>
      <CloseButton 
        title="close"
        onClick={toggleCart}
      >
        &times;
      </CloseButton>
      <Supreme>{me.name}'s Cart</Supreme>
      
      <p>You got {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart</p>
    </header>
    <ul>{me.cart.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id} />)}</ul>
  <footer>
    <p>$17.76</p>
  </footer>
                <SickButton>Checkout</SickButton>
              </CartStyles>
            )}
          </Query>
        )}
      </Mutation>
    )
    }}</User>
);

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
export default Cart;