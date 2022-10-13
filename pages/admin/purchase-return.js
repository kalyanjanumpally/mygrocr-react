import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentPurchaseReturn from "./../../components/admin/adminPurchaseReturn";


const PurchaseReturn = () => {
	
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
		{/*	<AdminSideBarComponent initialIndex={31} initialCatalogTab={displayCatalogTab} initialSupplierTab={displaySupplierTab}/> */}
			<AdminSideBarComponent initialIndex={54}/>
		</div>	
		<div className="col-md-10">
			<ComponentPurchaseReturn/>
		</div>
	</div>	
	
	
</>	
	
	
	
)}


export default PurchaseReturn;