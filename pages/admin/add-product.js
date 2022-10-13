import React from "react";
import Link from "next/link"
import Router from "next/router";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentAddProduct from "./../../components/admin/adminAddProduct";


const AddProduct = () => {
	
	return(
<>	
		<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={32} initialCatalogTab={1}/>
		</div>	
		<div className="col-md-10">
			<ComponentAddProduct/>
		</div>
	</div>	
	
</>	
	
	
	
)}


export default AddProduct;