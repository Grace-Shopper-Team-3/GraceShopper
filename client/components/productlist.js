import React from 'react'
import {connect} from 'react-redux'
// import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'
import ProductCard from './productcard'

class ProductList extends React.Component {
  render() {
    return (
      <div>
        <h1>All Plants</h1>
        <div>
          {/* map through products, render ProductCard for each item */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ()

// const mapDispatchToProps = dispatch => ()

export default connect(null)(ProductList)
