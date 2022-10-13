// import fetch from 'isomorphic-unfetch'
//import filterProductList from '../../util/filterProduct'
//import searchItemsByText from '../../util/searchItemsByText'
import * as Types from '../constants/actionTypes'




// Fetch Products and add to redux state- productsInfo 
export const addCategoriesToStore = (categories) => dispatch => {
		
	const categoriesArray = [];		
	for(let x in categories) {		
		categoriesArray.push(categories[x])		
	}			

	dispatch({
		type: Types.ADD_CATEGORIES,
		payload: categoriesArray
	})
}

export const deleteCatFromStore = (catId) => dispatch => {
	
	dispatch({
		type: Types.DELETE_CATEGORY,
		payload: catId
	})
}

export const addCategoryToStore = (catJSON) => dispatch => {
	
		dispatch({
		type: Types.ADD_CATEGORY,
		payload: catJSON
	})
	
	
}