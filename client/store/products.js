import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

// THUNK MIDDLEWARE
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.log('Failed to get products', error)
    }
  }
}

// REDUCER
const initialState = []
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
