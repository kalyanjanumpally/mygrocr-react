import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentPurchaseEntry from "./../../components/admin/adminPurchaseEntry";


const PurchaseEntry = () => {
	
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
		{/*	<AdminSideBarComponent initialIndex={31} initialCatalogTab={displayCatalogTab} initialSupplierTab={displaySupplierTab}/> */}
			<AdminSideBarComponent initialIndex={53}/>
		</div>	
		<div className="col-md-10">
			<ComponentPurchaseEntry/>
		</div>
	</div>	
	
	
</>	
	
	
	
)}


export default PurchaseEntry;