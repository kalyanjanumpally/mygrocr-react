// import fetch from 'isomorphic-unfetch'
//import filterProductList from '../../util/filterProduct'
//import searchItemsByText from '../../util/searchItemsByText'
import * as Types from '../constants/actionTypes'




// Fetch Products and add to redux state- productsInfo 
export const addAdminProductsToStore = (products) => dispatch => {
		
	const productsArray = [];		
	for(let x in products) {		
		productsArray.push(products[x])		
	}			

	dispatch({
		type: Types.ADMIN_ADD_PRODUCTS,
		payload: productsArray
	})
}

export const deleteProductFromStore = (prodId) => dispatch => {
	
	dispatch({
		type: Types.ADMIN_DELETE_PRODUCT,
		payload: prodId
	})
}

export const addProductToStore = (prodJSON) => dispatch => {
	
		dispatch({
		type: Types.ADMIN_ADD_PRODUCT,
		payload: prodJSON
	})		
}

export const toggleProdDisplayStatusInStore = (productId) => dispatch => {
	
		dispatch({
		type: Types.ADMIN_TOGGLE_PROD_DISPLAY,
		payload: productId
	})		
}

export const deleteCategoriesOfProductsInStore = (index, updatedCategories) => dispatch => {
	
		dispatch({
		type: Types.ADMIN_DELETE_CATEGORY_FROM_PRODUCT,
		 payload: { 
					"index": index, 
					"updatedCategories": updatedCategories 
				 } 		 
	})		
}

export const addCategoriesToProductInStore = (productId, selectCats) => dispatch => {
	
		dispatch({
		type: Types.ADMIN_ADD_CATEGORIES_TO_PRODUCT,
		 payload: { 
					"productId": productId, 
					"newCategories": selectCats 
				 } 		 
	})		
}