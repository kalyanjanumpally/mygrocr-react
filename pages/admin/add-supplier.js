import React from "react";
import Link from "next/link"
import Router from "next/router";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentAddSupplier from "./../../components/admin/adminAddSupplier";


const AddSupplier = () => {
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={52} initialSupplierTab={1}/>
		</div>	
		<div className="col-md-10">
			<ComponentAddSupplier/>
		</div>
	</div>	
	
</>	
	
	
	
)}


export default AddSupplier;