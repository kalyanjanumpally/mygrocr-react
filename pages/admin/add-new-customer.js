import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentAddCustomer from "./../../components/admin/adminAddCustomer";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const AddCustomer = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={42}/>
		</div>	
		<div className="col-md-10">
			<ComponentAddCustomer/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default AddCustomer;