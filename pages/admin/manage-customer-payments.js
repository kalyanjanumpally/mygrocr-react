import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManageCustomerPayments from "./../../components/admin/adminManageCustomerPayments";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManageCustomerPayments = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={43}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageCustomerPayments/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManageCustomerPayments;