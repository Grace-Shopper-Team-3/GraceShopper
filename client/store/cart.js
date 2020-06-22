import axios from 'axios'

//action type
const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'
//action creator

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const updateCart = () => {
  return {
    type: UPDATE_CART
  }
}

//thunks
export const getCartThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/cart')
    dispatch(setCart(response.data))
  }
}
export const setCartThunk = cartProduct => {
  return async dispatch => {
    const response = await axios.post('/api/cart', cartProduct)
    dispatch(setCart(response.data))
  }
}
export const addCartThunk = (productId, userId) => {
  return async dispatch => {
    const response = await axios.post('/api/cart/add', productId, userId)
    dispatch(setCart(response.data))
  }
}
export const deleteCartProductThunk = productId => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/${productId}`)
    dispatch(setCart(response.data))
  }
}

// should we also have a checkout thunk here?
// a thunk that resets the cart and sets the items of the cart to an actual order

const initialState = {
  cart: [],
  cartTotal: 0,
  cartSize: 0
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      let cartSize = 0
      const cartTotal = action.cart.reduce((total, elem) => {
        cartSize += elem.quantity
        total += elem.quantity * elem.product.price
        return total
      }, 0)
      return {
        ...state,
        cart: action.cart,
        cartTotal,
        cartSize
      }
    default:
      return state
  }
}
