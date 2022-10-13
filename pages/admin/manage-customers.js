import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManageCustomers from "./../../components/admin/adminManageCustomers";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManageCustomers = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={41}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageCustomers/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManageCustomers;