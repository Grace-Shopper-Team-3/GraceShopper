import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartThunk} from '../store/cart'

class Cart extends React.Component {
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
  cartItems: state.cart.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCartThunk(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
