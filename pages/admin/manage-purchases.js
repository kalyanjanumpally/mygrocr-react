import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManagePurchases from "./../../components/admin/adminManagePurchases";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const AdminViewPurchases = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={55}/>
		</div>	
		<div className="col-md-10">
			<ComponentManagePurchases/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default AdminViewPurchases;