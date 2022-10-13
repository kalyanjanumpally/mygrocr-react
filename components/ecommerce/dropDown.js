import React, { useEffect, useState } from "react";
import Link from "next/link";


const DropDownItems = (props) => {
				
	const [childMenu, setChildMenu] = useState(null);
		
	//fetch command to get children categories
	
//	console.log("catId in dropdown: " + props.catId);
			
 	const menuChildrenCatUrl = "http://localhost:8083/api/childcategories/" + props.catId;
	const childrenMenu = null;
	const returnMenu = [];

	const createDropDown = useEffect( () => { 
	
		const fetchChildrenCatData = async () => {
            try {
                const response = await fetch(menuChildrenCatUrl);
                childrenMenu = await response.json();
			//	console.log("Children Menu: " + childrenMenu[1].id);
				setChildMenu(childrenMenu);
				
            } catch (error) {
                console.log("error", error);
            }			
		}			
		fetchChildrenCatData();
	},[]);
		
	for (let x in childMenu) {
	    //console.log("childrenMenu:: " + childMenu[x].categoryName);
	    returnMenu.push( <li> <Link href="/products-page/[slug]" as={`/products-page/${childMenu[x].categoryId}`} ><a> {childMenu[x].categoryName}</a></Link></li>);
	}

	return returnMenu;		
}
	
	export default DropDownItems