import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManagePhoneOrders from "./../../components/admin/adminManagePhoneOrders";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManagePhoneOrders = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={12}/>
		</div>	
		<div className="col-md-10">
			<ComponentManagePhoneOrders/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManagePhoneOrders;