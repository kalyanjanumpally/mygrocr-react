// import fetch from 'isomorphic-unfetch'
//import filterProductList from '../../util/filterProduct'
import searchItemsByText from '../../util/searchItemsByText'
import * as Types from '../constants/actionTypes'




// Fetch Products and add to redux state- productsInfo 
export const addProductsInReduxState = (products) => dispatch => {
		
		const productsArray = [];
		
		console.log("Products in redux action: " + products)
		
		for(let x in products) {		
			productsArray.push(products[x])		
		}
		
		console.log("ProductsArray in redux action: " + productsArray)

        dispatch({
            type: Types.ADD_PRODDUCTINFO,
            payload: productsArray 
        })


}
