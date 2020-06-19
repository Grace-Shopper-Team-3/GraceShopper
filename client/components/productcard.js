import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {name, price, imageUrl, id} = props
  return (
    <Link to={`/products/${id}`}>
      <div className="products-grid-item">
        <img src={imageUrl} alt="product-photo" />
        <h3>{name}</h3>
        <p>${price}.00</p>

        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

export default ProductCard
