import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  deleteCartProductThunk,
  updateQuantityThunk,
  getCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {}

  handleChange(event, quantity, productId) {
    event.preventDefault()
    this.props.updateQuantity(productId, quantity)
  }

  handleClick(event, productId) {
    event.preventDefault()
    this.props.removeItem(productId)
  }

  render() {
    const {user} = this.props
    const items = this.props.items
    const cartItems = this.props.cart
    if (this.props.cart.isLoading) {
      return <h1>Loading...</h1>
    }

    if (cartItems.length > 0) {
      return (
        <div className="page">
          <h1>My Cart</h1>
          <div className="cart-grid">
            <div className="cart-item">
              <p>item name</p>
              <p>price</p>
              <div>
                <ul>
                  {cartItems.map(cartItem => (
                    <div key={cartItem.productId}>
                      <form>
                        <label>Quantity</label>
                        <select
                          name="quantity"
                          onChange={event =>
                            this.handleChange(
                              event,
                              event.target.value,
                              cartItem.productId
                            )
                          }
                        >
                          <option value={cartItem.quantity}>
                            {cartItem.quantity}
                          </option>
                          {// this below will list al of the items with their rrespextive props and increase the quant by one
                          [
                            ...Array(
                              items.find(item => item.id === cartItem.productId)
                                .quantity + 1
                            ).keys()
                          ].map(num => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                  ))}
                </ul>
              </div>
              <p>image</p>
            </div>
            <div className="cart-summary">
              <p>Cart total: $50</p>
              <Link to={`/checkout/${user.id}`}>
                <button> Checkout </button>
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
  user: state.user,
  cart: state.cart,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartThunk(userId)),
  updateQuantity: (productId, quantity) =>
    dispatch(updateQuantityThunk(productId, quantity)),
  removeItem: productId => dispatch(deleteCartProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
