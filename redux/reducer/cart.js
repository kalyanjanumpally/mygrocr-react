import storage from "../../util/localStorage";
import { deleteProduct, findProductIndexById } from "../../util/util";
import * as Types from "../constants/actionTypes";

export default (state = [], action) => {
    let index = null;

    switch (action.type) {             //"dokani_cart" is the key of the cart-related key-value pair in local storage. The corresponding value is the 'state' object/string.
        case Types.INIT_LOCALSTORAGE:
            return [...action.payload.cart];

        case Types.ADD_TO_CART:

			console.log("From redux reducer, cart: " + JSON.stringify(action.payload))
            index = findProductIndexById(state, action.payload.product[0].productId);
			console.log("Index:" + index)
			console.log("state: " + JSON.stringify(state))
			console.log("state[index]: " + JSON.stringify(state[index]))		

            if (index !== -1) {                       //product present in 'state' from redux store
                state[index].productQuantity += action.payload.product[0].productQuantity;		//is this correct?, should be-	state[index].productQuantity += action.payload.product.productQuantity
                storage.set("dokani_cart", [...state]);    // The data from 'state' variable get added to that in localStorage. Couldnt understand.

                return [...state];                   //the 'state' here is the from the redux store. So the 'state' of redux store is getting updated here.
            } else {                                 //product not present in 'state' from redux store
					if (!action.payload.product[0].productQuantity) {    //quantity is already set to min '1' in the ProductDetails js file. So this condition will always be false.
                    action.payload.product[0].productQuantity = 1;
					}
					storage.set("dokani_cart", [...state, action.payload.product[0]]); // the 'state' here is from redux, to which the new product is added and then, the data is added to the value of dokani_cart in localStorage.
				
					return [...state, action.payload.product[0]];   //the 'state' here is the from the redux store
            }

        case Types.DELETE_FROM_CART:
            const newCartItems = deleteProduct(state, action.payload.productId);
            storage.set("dokani_cart", newCartItems);

            return [...newCartItems];

 /*        case Types.INCREASE_QUANTITY:
            index = findProductIndexById(state, action.payload.productId);
            if (index === -1) return state;

            state[index].productQuantity += 1;
			console.log("From state: " + state[index].productQuantity)

            storage.set("dokani_cart", [...state]);

            return [...state];

        case Types.DECREASE_QUANTITY:
            index = findProductIndexById(state, action.payload.productId);
            if (index === -1) return state;

            const quantity = state[index].productQuantity;
            if (quantity > 1) state[index].productQuantity -= 1;
            storage.set("dokani_cart", [...state]);

            return [...state];
 */
        case Types.CLEAR_CART:
            storage.set("dokani_cart", []);
            return [];

        default:
            return state;
    }
};
