import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {title, price, imageUrl, id} = props
  return (
    <Link to={`/products/${id}`}>
      <div>
        <h3>Product Name</h3>
        <img src="#" alt="product-photo" />
        <p>Price</p>
        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

export default ProductCard
