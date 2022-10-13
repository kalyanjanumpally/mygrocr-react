import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManageOnlineOrders from "./../../components/admin/adminManageOnlineOrders";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManageOnlineOrders = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={11}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageOnlineOrders/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManageOnlineOrders;