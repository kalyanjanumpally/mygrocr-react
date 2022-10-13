import React from "react";


const catChainDeveloper = (cat, categories) => {
		
	const catChainArray = [];
	catChainArray.push(cat.categoryName);
	const parentCatId = cat.parentCategoryId;
	
	if(categories.length>0) {		
		while(parentCatId > 0) { 	
		//find cat name from cat id							
			for( let x in categories) {	
				if(categories[x].categoryId == parentCatId) {
					catChainArray.push(categories[x].categoryName);
					parentCatId = categories[x].parentCategoryId;
					break; 
				} 
			} 
		}	
	 }  
	 
	const catChainString = [];
	let checkIter = 1
	while(catChainArray.length >0) {
		if(checkIter ==1) {
			catChainString = catChainArray.pop();
		} 
		else {
			catChainString = catChainString + " > " + catChainArray.pop();
		}
		checkIter = 0;
	}
	return catChainString;		
}

export default catChainDeveloper
	
	