import React from "react";
import Link from "next/link"
import Router from "next/router";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentManageSuppliers from "./../../components/admin/adminManageSuppliers";


const ManageSuppliers = () => {
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={51} initialSupplierTab={true}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageSuppliers/>
		</div>
	</div>	
	
</>	
	
	
	
)}


export default ManageSuppliers;