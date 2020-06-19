import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct, removeSingleProduct} from '../store/singleProduct'
import store from '../store'

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

  render() {
    const productName = this.props.selectedProduct.name
    const productImageUrl = this.props.selectedProduct.imageUrl
    const productPrice = this.props.selectedProduct.price
    const productDescription = this.props.selectedProduct.description
    const productInventory = this.props.selectedProduct.warehouseInv

    return (
      <div>
        <h1> {productName}</h1>
        <h2>
          {' '}
          <img src={productImageUrl} alt="product-photo" />{' '}
        </h2>
        <h3> {productPrice}</h3>
        <h3> {productInventory}</h3>
        <div> {productDescription}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.singleProduct
    // isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
