/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as ProductList} from './ProductList'
export {default as ProductCard} from './ProductCard'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as Checkout} from './Checkout'
export {default as Confirmation} from './Confirmation'
import {default as OrderForm} from './orderform'
export {Login, Signup} from './auth-form'
