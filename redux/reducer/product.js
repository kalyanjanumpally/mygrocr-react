import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = { items: [] }, action) => {     //Structure of state is..  state.items[{product 1},{product 2},{product 3},...]  
    switch (action.type) {
        case Types.FETCHED_PRODUCT:                      
            return {
                ...state,
                items: [...action.payload.products],    //here, old array(items) of products is completely replaced by new array of products in the state 
            };

        case Types.FETCHED_MORE_PRODUCT:
            const mergeAllProducts = [
                ...state.items,
                ...action.payload.products, //here, a new array of items containing old products and new products from payload is created in a new array (mergeAllProducts)
            ];
            // console.log(mergeAllProducts);
            const limit =
                action.payload.total &&
                mergeAllProducts.length > action.payload.total
                    ? mergeAllProducts.splice(0, action.payload.total)
                    : mergeAllProducts;

            return {
                ...state,
                items: [...limit],
            };

        case Types.ADD_PRODUCT:
            return {
                ...state,
                items: [...state.items, action.payload],  //new products from payload are added/updated in array of items from state, similar to FETCHED_MORE_PRODUCT
            };

        case Types.DELETE_PRODUCT:
            return deleteProduct(state, action.payload.id);

        case Types.UPDATE_PRODUCT:
            const index = findProductIndexById(state, action.payload.product.id);
            state[index] = action.payload.product;

            return { ...state };

        default:
            return state;
    }
};
