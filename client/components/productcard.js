import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {name, price, imageUrl, id} = props
  return (
    <Link to={`/products/${id}`}>
      <div>
        <h3>{name}</h3>
        <img src={imageUrl} alt="product-photo" />
        <p>{price}</p>
        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

export default ProductCard
