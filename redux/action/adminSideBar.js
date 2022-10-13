import * as Types from '../constants/actionTypes'



// Fetch Products and add to redux state- productsInfo

export const initializeTabs = () => dispatch => {	

	const catalogTab = false;
	const supplierTab = false;
	const ordersTab = false;
	const reportsTab = false;
	const customerTab = false;

	dispatch({
		type: Types.INITIALIZE_TABS,
		payload: {
					"catalogTab": catalogTab, 
					"supplierTab": supplierTab,
					"ordersTab": ordersTab,
					"reportsTab": reportsTab,
					"customerTab": customerTab
				}
	})
}
 
export const toggleCatalogTab = () => dispatch => {

	dispatch({
		type: Types.TOGGLE_CATALOG_TAB,
		payload: null,
	})
}


export const toggleSupplierTab = () => dispatch => {				

	dispatch({
		type: Types.TOGGLE_SUPPLIER_TAB,
		payload: null,
	})
}


export const toggleOrdersTab = () => dispatch => {				

	dispatch({
		type: Types.TOGGLE_ORDERS_TAB,
		payload: null,
	})
}


export const toggleReportsTab = () => dispatch => {				

	dispatch({
		type: Types.TOGGLE_REPORTS_TAB,
		payload: null,
	})
}


export const toggleCustomerTab = () => dispatch => {				

	dispatch({
		type: Types.TOGGLE_CUSTOMER_TAB,
		payload: null,
	})
}