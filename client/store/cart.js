import axios from 'axios'

//action types
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_CART = 'GET_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const CHECKOUT_CART = 'CHECKOUT_CART'

//action creators

export const getCart = products => ({
  type: GET_CART,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

export const checkoutCart = userId => ({
  type: CHECKOUT_CART,
  cart
})

//thunks
export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/cart/${userId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('Failed to get user cart', error)
    }
  }
}

export const addToCartThunk = (productId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/cart/${userId}`, {
        id: productId
      })
      dispatch(addProduct(data))
    } catch (error) {
      console.log('Failed to add to cart', error)
    }
  }
}

export const deleteCartProductThunk = (productId, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/cart/${userId}/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log('Failed to remove item from cart', error)
    }
  }
}

export const checkoutCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/users/checkout/${userId}`)
      dispatch(checkoutCart(data))
    } catch (error) {
      console.log('Failed to checkout cart', error)
    }
  }
}

const initialState = {
  products: []
}

//reducer

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, products: [...action.products]}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case REMOVE_PRODUCT: {
      let updatedCart = state.products.filter(
        product => product.id !== action.productId
      )
      return {...state, products: updatedCart}
    }
    case CHECKOUT_CART:
      return initialState
    default:
      return state
  }
}

export default cartReducer

// let cartSize = 0
// const cartTotal = action.cart.reduce((total, elem) => {
//   cartSize += elem.quantity
//   total += elem.quantity * elem.product.price
//   return total
// }, 0)
// return {
//   ...state,
//   cart: action.cart,
//   cartTotal,
//   cartSize
// }
