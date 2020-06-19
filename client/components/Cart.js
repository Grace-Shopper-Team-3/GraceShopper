import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import thunks from store

class Cart extends React.Component {
  componentDidMount() {}

  render() {
    const {user} = this.props

    const cartItems = ['item']
    // const {cartItems} = this.props

    if (cartItems.length > 0) {
      return (
        <div className="page">
          <h1>My Cart</h1>
          <div className="cart-grid">
            <div className="cart-item">
              <p>item name</p>
              <p>price</p>
              <p>quantity</p>
              <p>image</p>
            </div>
            <div className="cart-summary">
              <p>Cart total: $50</p>
              <Link to={`/checkout/${user.id}`}>
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="page">
          <h3>Your cart is empty</h3>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
  //cartItems
})

// const mapDispatchToProps = dispatch => ({
//   getCart: userId => {
//     dispatch(fetchCart(userId))
//   }
// })

export default connect(mapStateToProps)(Cart)
