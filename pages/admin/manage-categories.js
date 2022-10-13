import React from "react";
import Link from "next/link"
import Router from "next/router";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentManageCategories from "./../../components/admin/adminManageCategories";


const ManageCategories = () => {
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={33} initialCatalogTab={1}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageCategories/>
		</div>
	</div>	
	
</>	
	
	
	
)}


export default ManageCategories;