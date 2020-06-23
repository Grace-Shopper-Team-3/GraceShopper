import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartThunk, checkoutCartThunk} from '../store/cart'
import OrderForm from './orderform'

class Checkout extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getCart(userId)
  }

  total = () => {
    const total = this.props.cartItems.reduce(function total(acc, val) {
      const quantity = val.orders[0].productorder.quantity
      return acc + val.price * quantity
    }, 0)
    return total
  }

  render() {
    const {cartItems} = this.props
    console.log(cartItems)

    return (
      <div className="page">
        <h1>Checkout</h1>
        <div className="cart-summary">
          {cartItems.map(item => (
            <div className="single-product" key={item.id}>
              <img
                src={item.imageUrl}
                style={{width: '150px', marginBottom: '50px'}}
              />
              <div>
                <h3>{item.name}</h3>
                <h5>Price: ${item.price}.00</h5>
                <h5>Quantity: {item.orders[0].productorder.quantity} </h5>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-order-form">
          <div>
            <h2>Order Total: ${this.total()}.00</h2>
          </div>
          <OrderForm />
          <Link to="/confirmation">
            <button onClick={() => this.props.checkoutCart(this.props.user.id)}>
              Confirm Purchase
            </button>
          </Link>
        </div>
      </div>
    )
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
  checkoutCart: userId => dispatch(checkoutCartThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
