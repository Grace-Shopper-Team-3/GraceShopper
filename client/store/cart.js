import axios from 'axios'

const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_CART = 'GET_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_QUANT = 'UPDATE_QUANT'

export const getCart = products => ({
  type: GET_CART,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product
})
export const updateQuantity = cart => ({
  type: UPDATE_QUANT,
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

export const deleteCartProductThunk = (product, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/cart/${userId}/${product.id}`)
      dispatch(removeProduct(product.id))
    } catch (error) {
      console.log('Failed to remove item from cart', error)
    }
  }
}
export const updateQuantityThunk = (product, quantity, userId) => {
  return async dispatch => {
    try {
      const res = await axios.patch(`/api/users/cart/${userId}/${product.id}`, {
        quantity: quantity
      })
      const updatedQuant = res.data
      dispatch(updateQuantity(updatedQuant))
    } catch (error) {
      dispatch(error)
    }
  }
}

// should we also have a checkout thunk here?
// a thunk that resets the cart and sets the items of the cart to an actual order

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
    case UPDATE_QUANT: {
      return {...state, cart: action.cart}
    }
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
