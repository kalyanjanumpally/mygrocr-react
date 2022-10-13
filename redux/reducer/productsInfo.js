import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = { items: [] }, action) => {
    switch (action.type) {
        
        case Types.ADD_PRODDUCTINFO:
		
			const productsArray = action.payload;
			const productsToAdd = productsArray.filter(checkRepeatProduct);
			
			function checkRepeatProduct(prod) {
				
				var returnValue = true
				
				state.items.map( (stateProd) => {
					
					if(stateProd.productId == prod.productId) {
						returnValue = false;	
					}
				})
				return returnValue;
			}
			
		
            const mergeAllProducts = [
                ...state.items,
                ...productsToAdd,
            ];
            

            return {
                ...state,
                items: [...mergeAllProducts],
            };

        default:
            return state;
    }
};
