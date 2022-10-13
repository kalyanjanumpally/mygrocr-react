import React from "react";
import Link from "next/link"
import Router from "next/router";
import {useRouter} from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { connect } from "react-redux";
import AdminSideBarComponent from "./../../../components/admin/adminSideBarComponent"
import ComponentEditPurchase from "./../../../components/admin/adminEditPurchase";

const AdminEditPurchase = () => {

	const router = useRouter();
	const [editPurchaseInvoiceId, setEditPurchaseInvoiceId] = useState(0);
		
	useEffect( ()=> {
		setEditPurchaseInvoiceId(router.query.slug)			
	},[router.query.slug])
	
	return(
	<>	
	
	<div className="row height-100vh">
	<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={-1}/>
	</div>	 
		<div className="col-md-10">
			<ComponentEditPurchase editPurchaseInvoiceId={editPurchaseInvoiceId}/>
		</div>
	</div>	
	
	</>
)}

export default AdminEditPurchase;