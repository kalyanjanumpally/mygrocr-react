import { combineReducers } from 'redux'
import products from './product'
import cart from './cart'
import wishlist from './wishlist'
import quickView from './quickView'
import compare from './compare'
import productFilters from './productFilters'
import productsInfo from './productsInfo'   //by Sandeep
import categories from './categories'
import adminProducts from './adminProducts'
import adminSideBar from './adminSideBar'

const rootReducer = combineReducers({
    products,
    cart,
    wishlist,
    quickView,
    compare,
    productFilters,
	productsInfo,
	categories,
	adminProducts,
	adminSideBar
})

export default rootReducer