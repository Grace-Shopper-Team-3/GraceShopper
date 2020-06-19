import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Confirmation extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="page">
        <h1>Your order has been placed.</h1>
        <div className="cart-summary">
          <h3>Thanks for shopping with us.</h3>
        </div>
      </div>
    )
  }
}

export default Confirmation
