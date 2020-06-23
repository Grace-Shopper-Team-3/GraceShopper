import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartThunk, deleteCartProductThunk} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    const {getCart} = this.props
    getCart(userId)
  }

  deleteFromCart = product => {
    const userId = this.props.user.id
    this.props.deleteItem(product.id, userId)
  }

  total = () => {
    const total = this.props.cartItems.reduce(function total(acc, val) {
      const quantity = val.orders[0].productorder.quantity
      return acc + val.price * quantity
    }, 0)
    return total
  }

  render() {
    const {user} = this.props
    const {cartItems} = this.props

    if (cartItems.length > 0) {
      return (
        <div className="page">
          <h1>My Cart</h1>
          <div className="cart-grid">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}.00</p>
                  <img src={item.imageUrl} alt="product" />
                </div>
                <div className="cart-item-buttons">
                  <button>Increase Quantity</button>
                  <button>Decrease Quantity</button>
                  <button
                    type="submit"
                    onClick={() => this.deleteFromCart(item)}
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-checkout-button">
            <Link to={`/checkout/${user.id}`}>
              <h2>Order Total: ${this.total()}.00</h2>
              <button>Checkout</button>
            </Link>
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
  user: state.user,
  cartItems: state.cart.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCartThunk(userId))
  },
  deleteItem: (product, userId) => {
    dispatch(deleteCartProductThunk(product, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
