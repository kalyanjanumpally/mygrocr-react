import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentManageProducts from "./../../components/admin/adminManageProducts";


const ManageProducts = () => {
	
/* 	const router = useRouter();
	
	const [displayCatalogTab, setDisplayCatalogTab] = useState(router.query.displayCatalogTab)
	const [displaySupplierTab, setDisplaySupplierTab] = useState(router.query.displaySupplierTab)
	

	
	useEffect(() => {
		setDisplayCatalogTab(router.query.displayCatalogTab);
		setDisplaySupplierTab(router.query.displaySupplierTab);
	},[router.query]) */
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
		{/*	<AdminSideBarComponent initialIndex={31} initialCatalogTab={displayCatalogTab} initialSupplierTab={displaySupplierTab}/> */}
			<AdminSideBarComponent initialIndex={31}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageProducts/>
		</div>
	</div>	
	
	
</>	
	
	
	
)}


export default ManageProducts;