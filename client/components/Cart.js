import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCartThunk,
  deleteCartProductThunk,
  updateQuantityThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const userId = this.props.user.id
    const {getCart} = this.props
    getCart(userId)
  }

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
    const {cartItems} = this.props
    const currentItems = this.props.cart

    console.log('cartitems', cartItems)

    if (cartItems.length > 0) {
      return (
        <div className="page">
          <h1>My Cart</h1>
          <div className="cart-grid">
            {cartItems.map(item => (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <p>${item.price}.00</p>
                <div>
                  <ul>
                    {currentItems.map(currentItem => (
                      <div key={currentItem.productId}>
                        <form>
                          <label>Quantity</label>
                          <select
                            name="quantity"
                            onChange={event =>
                              this.handleChange(
                                event,
                                event.target.value,
                                currentItem.productId
                              )
                            }
                          >
                            <option value={currentItem.quantity}>
                              {currentItem.quantity}
                            </option>
                            {// this below will list al of the items with their rrespextive props and increase the quant by one
                            [
                              ...(
                                currentItems.find(
                                  currentItemTwo =>
                                    currentItemTwo.id ===
                                    currentItemTwo.productId
                                ).quantity + 1
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
                <img src={item.imageUrl} alt="product" />
              </div>
            ))}

            <Link to={`/checkout/${user.id}`}>
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
  cartItems: state.cart.products,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCartThunk(userId))
  },
  updateQuantity: (productId, quantity) =>
    dispatch(updateQuantityThunk(productId, quantity)),
  removeItem: productId => dispatch(deleteCartProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
