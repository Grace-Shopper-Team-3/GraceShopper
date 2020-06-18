import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import ProductCard from './productcard'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {user, products} = this.props
    console.log('products', products)

    return (
      <div>
        <h1>All Plants</h1>

        <div>
          {products.map(product => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                id={product.id}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
