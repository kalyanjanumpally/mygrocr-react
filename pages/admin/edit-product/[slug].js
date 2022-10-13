import React from "react";
import Link from "next/link"
import Router from "next/router";
import {useRouter} from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { connect } from "react-redux";
import { addCategoriesToStore } from "./../../../redux/action/categories";
import catChainDeveloper from "./../../../components/admin/catChainDeveloper";
import { findCategoryIndexById } from "./../../../util/util"
import ImageManagerWindow from "./../../../components/admin/imageManagerWindow"
import delCrossImage from "./../../../public/assets/imgs/icons/delete_cross.svg";
import AdminSideBarComponent from "./../../../components/admin/adminSideBarComponent"
import ComponentEditProduct from "./../../../components/admin/adminEditProduct";
// Import the Slate editor factory.
//import { createEditor } from 'slate'
// Import the Slate components and React plugin.
//import { Slate, Editable, withReact } from 'slate-react'

const EditProduct = ({categories, addCategoriesToStore}) => {

	const router = useRouter();
	const [editProductId, setEditProductId] = useState(0);
		
	useEffect( ()=> {
		setEditProductId(router.query.slug)				
	},[router.query.slug])
	
	return(
	<>	
	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
			<AdminSideBarComponent initialIndex={-1} />
		</div>	
		<div className="col-md-10">
			<ComponentEditProduct editProductId={editProductId}/>
		</div>
	</div>	
	
	</>
)}

export default EditProduct;