import { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { connect } from "react-redux";
import AdminSideBarComponent from "./../../components/admin/adminSideBarComponent";
import ComponentHome from "./../../components/admin/adminHome";
import { initializeTabs } from "./../../redux/action/adminSideBar"


const Admin = ({initializeTabs, catalogTab, supplierTab, ordersTab}) => {
	
	useEffect(()=> {		
		initializeTabs();			
	},[])
	
	
	
	return(
<>	
	<div className="row height-100vh">
		<div className="col-md-2  dashboard-admin">
		<AdminSideBarComponent initialIndex={0}/>
		</div>	
		<div className="col-md-10">
			<ComponentHome/>
		</div>
	</div>
	
</>	
	
	
	
)}

const mapStateToProps = (state) => ({
		catalogTab: state.adminSideBar.catalogTab,
		supplierTab: state.adminSideBar.supplierTab,
		ordersTab: state.adminSideBar.ordersTab,
});
 
 
const mapDispatchToProps = {
	initializeTabs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

