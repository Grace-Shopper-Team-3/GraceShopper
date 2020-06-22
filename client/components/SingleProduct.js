import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/singleProduct'
import {toast} from 'react-toastify'
import {addToCartThunk} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  addToCart = () => {
    const productId = this.props.selectedProduct.id
    const userId = this.props.user.id

    this.props.addToCart(productId, userId)
  }

  render() {
    const {selectedProduct} = this.props
    const {name, imageUrl, price, description} = selectedProduct

    return (
      <div className="page">
        <div className="single-product">
          <img src={imageUrl} alt="product-photo" />
          <div className="single-product-details">
            <h1>{name}</h1>
            <h3>${price}.00</h3>
            <p>{description}</p>
            <button type="button" onClick={this.addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: (productId, userId) =>
      dispatch(addToCartThunk(productId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
