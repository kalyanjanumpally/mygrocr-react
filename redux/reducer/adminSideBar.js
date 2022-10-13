import * as Types from "../constants/actionTypes";

// {items:[],filteredList:[]}

export default (state = {}, action) => {
    switch (action.type) {
        
        case Types.INITIALIZE_TABS:
			const tabs = action.payload;           
            return {...tabs};
			
		
		case Types.TOGGLE_CATALOG_TAB:

			const updatedTabs = JSON.parse(JSON.stringify(state));
			updatedTabs.catalogTab = !updatedTabs.catalogTab;

		//	return {...updatedTabs};	
			return {...updatedTabs};

		
		case Types.TOGGLE_SUPPLIER_TAB:

			const updatedTabs2 = JSON.parse(JSON.stringify(state));
			updatedTabs2.supplierTab = !updatedTabs2.supplierTab;
		
            return {...updatedTabs2};
			
		
		case Types.TOGGLE_ORDERS_TAB:

			const updatedTabs3 = JSON.parse(JSON.stringify(state));
			updatedTabs3.ordersTab = !updatedTabs3.ordersTab;
		
            return {...updatedTabs3};	
			
			
		case Types.TOGGLE_REPORTS_TAB:

			const updatedTabs4 = JSON.parse(JSON.stringify(state));
			updatedTabs4.reportsTab = !updatedTabs4.reportsTab;
		
            return {...updatedTabs4};
			
		
		case Types.TOGGLE_CUSTOMER_TAB:

			const updatedTabs5 = JSON.parse(JSON.stringify(state));
			updatedTabs5.customerTab = !updatedTabs5.customerTab;
		
            return {...updatedTabs5};


		default:
            return state;
    }
};
