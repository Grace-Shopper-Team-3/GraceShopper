import axios from 'axios'

// ACTION TYPES

const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'

//INITIAL STATE
const defaultProduct = {}
//ACTION CREATORS

export const getProduct = product => ({
  type: GET_PRODUCT,
  product: product
})

export const removeProduct = () => ({
  type: REMOVE_PRODUCT
})

export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      const Product = res.data
      dispatch(getProduct(Product))
    } catch (error) {
      console.error('Cannot get Single Product!')
    }
  }
}

export const singleProductReducer = (state = defaultProduct, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case REMOVE_PRODUCT:
      return state
    default:
      return state
  }
}

export default singleProductReducer
