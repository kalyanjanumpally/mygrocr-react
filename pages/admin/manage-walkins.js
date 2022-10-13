import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import ComponentManageWalkins from "./../../components/admin/adminManageWalkins";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";

const ManageWalkins = () => {
	

return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={13}/>
		</div>	
		<div className="col-md-10">
			<ComponentManageWalkins/>
		</div>
	</div>	
	
	
</>			
	
	
)}

export default ManageWalkins;