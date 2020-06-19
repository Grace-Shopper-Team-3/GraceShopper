import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, removeSingleProduct} from '../store/singleProduct'
import {toast} from 'react-toastify'
import {addCartThunk} from '../store/cart'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: this.props.selectedProduct
    }
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  // const handleClick = event => {
  //   event.preventDefault()
  //   props.addToCart({product: product, quantity: 1})
  //   toast.success(`${product.name} added to cart!`)
  // }
  addToCart = () => {
    const productId = this.props.selectedProduct.id
    const productQuantity = this.state.quantity

    if (this.state.quantity === '') {
      this.props.addToCart(productId, 1)
      toast.success(`${this.props.selectedProduct.name} added to cart!`)
    } else {
      this.props.addToCart(productId, productQuantity)
      toast.success(`${this.props.selectedProduct.name} added to cart!`)
    }
  }
  render() {
    const productName = this.props.selectedProduct.name
    const productImageUrl = this.props.selectedProduct.imageUrl
    const productPrice = this.props.selectedProduct.price
    const productDescription = this.props.selectedProduct.description
    const productInventory = this.props.selectedProduct.warehouseInv
    const userId = this.props.user.id
    const productId = this.props.selectedProduct.id

    return (
      <div className="page">
        <div className="single-product">
          <img src={productImageUrl} alt="product-photo" />
          <div className="single-product-details">
            <h1>{productName}</h1>
            <h3>${productPrice}.00</h3>
            <p>{productDescription}</p>
          </div>
          <button type="button" onClick={this.addToCart(productId, userId)}>
            Add to Cart
          </button>
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
    addToCart: (productId, userId) => dispatch(addCartThunk(productId, userId))

    // addToCart: cart => dispatch(addToCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
