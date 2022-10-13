import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = [], action) => {
    switch (action.type) {
        
        case Types.ADMIN_ADD_PRODUCTS:
		
			const products = action.payload;           
            return [...products];

		
		case Types.ADMIN_DELETE_PRODUCT:

			const catId = action.payload;		
			const newProducts = deleteProduct(state, catId);

            return [...newProducts];
			
		
		case Types.ADMIN_ADD_PRODUCT:

			const newProduct = action.payload;
            return [...state, newProduct];	
			
		
		case Types.ADMIN_TOGGLE_PROD_DISPLAY:

			const productId = action.payload;	
			const index = findProductIndexById(state, productId);	

            if (index !== -1) {  			 
			state[index].display = !state[index].display;

            return [...state]; 
			}
			
		case Types.ADMIN_DELETE_CATEGORY_FROM_PRODUCT:

			const updateCategoriesIndex = action.payload.index;
			const updatedCategories = action.payload.updatedCategories;

			if (index !== -1) {  			 
			state[updateCategoriesIndex].categories = updatedCategories;

			return [...state]; 
			}	

		case Types.ADMIN_ADD_CATEGORIES_TO_PRODUCT:
		
			const productIdAddCat = action.payload.productId;
			const addCategories = action.payload.newCategories;
			const indexAddCat = findProductIndexById(state, productIdAddCat);	
			
			if (indexAddCat !== -1) { 											
				state[indexAddCat].categories = [...state[indexAddCat].categories, ...addCategories];								
			}
            return [...state];

		default:
            return state;
    }
};
