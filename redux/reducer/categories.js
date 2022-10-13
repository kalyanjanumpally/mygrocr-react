import { deleteCategory } from "../../util/util";
import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = [], action) => {
    switch (action.type) {
        
        case Types.ADD_CATEGORIES:
		
			const categories = action.payload;           
            return [...categories];

		
		case Types.DELETE_CATEGORY:

			const catId = action.payload;		
			const newCategories = deleteCategory(state, catId);

            return [...newCategories];
			
		case Types.ADD_CATEGORY:

			const newCategory = action.payload;
            return [...state, newCategory];	


		default:
            return state;
    }
};


