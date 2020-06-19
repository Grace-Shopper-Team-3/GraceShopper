import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  componentDidMount() {
    //this.props.fetchCart()
  }

  render() {
    return (
      <div className="page">
        <h1>Confirm your order</h1>
        <div className="cart-summary">
          <h3>item details here</h3>

          <Link to="/confirmation">
            <button>Purchase Order</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Checkout
