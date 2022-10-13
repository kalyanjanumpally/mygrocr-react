import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManageSalesReturns from "./../../components/admin/adminManageSalesReturns";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManageSalesReturns = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={15}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageSalesReturns/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManageSalesReturns;