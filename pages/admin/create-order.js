import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentCreateOrder from "./../../components/admin/adminCreateOrder";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const CreateOrder = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={14}/>
		</div>	
		<div className="col-md-10">
			<ComponentCreateOrder/>
		</div>
	</div>	
	
	
</>		
	
	
)}

export default CreateOrder;