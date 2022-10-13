import React from "react";
import Link from "next/link"
import Router from "next/router";
import {useRouter} from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { connect } from "react-redux";
import AdminSideBarComponent from "./../../../components/admin/adminSideBarComponent"
import ComponentEditOrder from "./../../../components/admin/adminEditOrder";

const AdminEditOrder = () => {

	const router = useRouter();
	const [editOrderId, setEditOrderId] = useState(0);
		
	useEffect( ()=> {
		setEditOrderId(router.query.slug)			
	},[router.query.slug])
	
	return(
	<>	
	
	<div className="row height-100vh">
	<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={-1}/>
	</div>	 
		<div className="col-md-10">
			<ComponentEditOrder editOrderId={editOrderId}/>
		</div>
	</div>	
	
	</>
)}

export default AdminEditOrder;