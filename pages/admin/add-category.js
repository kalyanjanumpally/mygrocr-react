import React from "react";
import Link from "next/link"
import Router from "next/router";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentAddCategory from "./../../components/admin/adminAddCategory";


const AddCategory = () => {
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={34} initialCatalogTab={1}/>
		</div>	
		<div className="col-md-10">
			<ComponentAddCategory/>
		</div>
	</div>	
	
</>	
	
	
	
)}


export default AddCategory;