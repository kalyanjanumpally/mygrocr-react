import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentReports from "./../../components/admin/adminReports";


const Reports = () => {
	
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={61}/>
		</div>	
		<div className="col-md-10">
			<ComponentReports/>
		</div>
	</div>	
	
	
</>	
	
	
	
)}


export default Reports;