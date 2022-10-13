import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toggleSupplierTab, toggleCatalogTab , toggleOrdersTab, toggleReportsTab, toggleCustomerTab} from "./../../redux/action/adminSideBar"


const AdminSideBarComponent = ({catalogTab, supplierTab, ordersTab, reportsTab, customerTab, initialIndex, toggleSupplierTab, toggleCatalogTab, toggleOrdersTab, toggleReportsTab, toggleCustomerTab}) => {
	
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	
	const router = useRouter();

    const handleClick = (index) => {	
	
		if(index==0){
			router.push("/admin")
		}	
		if(index==11){
			router.push("/admin/manage-online-orders")
		}
		if(index==12){
			router.push("/admin/manage-phone-orders")
		}
		if(index==13){
			router.push("/admin/manage-walkins")
		}		
		if(index==14){
			router.push("/admin/create-order")
		}
		if(index==15){
			router.push("/admin/sales-returns")
		}

		if(index==31){
			{/*router.push({pathname: "/admin/manage-products", query:{displayCatalogTab: displayCatalogTab, displaySupplierTab: displaySupplierTab}})	*/}
			router.push("/admin/manage-products")
		}
		if (index==32) {
			router.push("/admin/add-product")
		}
		if (index==33) {
			router.push("/admin/manage-categories")
		}
		if (index==34) {
			router.push("/admin/add-category")
		}
		if (index==41) {
			router.push("/admin/manage-customers")
		}
		if (index==42) {
			router.push("/admin/add-new-customer")
		}
		if (index==43) {
			router.push("/admin/manage-customer-payments")
		}
		if (index==51) {
			router.push("/admin/manage-suppliers")
		}
		if (index==52) {
			router.push("/admin/add-supplier")
		}
		if (index==53) {
			router.push("/admin/purchase-entry")
		}
		if (index==54) {
			router.push("/admin/purchase-return")
		}
		if (index==55) {
			router.push("/admin/manage-purchases")
		}		
		if (index==61) {
			router.push("/admin/reports")
		}
    };
	
	const handleCatalogClick = () => {
		toggleCatalogTab();	
	}
	
	const handleSupplierClick = () => {
		toggleSupplierTab();
	}

	const handleReportsClick = () => {
		toggleReportsTab();
	}
	
	const handleOrdersClick = () => {
		toggleOrdersTab();
	}
	
	const handleCustomerClick = () => {
		toggleCustomerTab();
	}
	
	
	return(

<>
	<div className="row height-100vh">
		
			<div className="tab-style3 mt-30">
				<ul className="flex-column admin-ul" role="tablist">
					<li className={activeIndex === 0 ? " active" : ""} >
						<a onClick={() => handleClick(0)}>Home</a>
					</li>
					<li>
						<a onClick={handleOrdersClick}>Orders</a>
						<div className= { ordersTab ? "tab-pane fade active show" : "d-none "} >	
							<ul className="flex-column admin-sublist" role="tablist">
								<li className={activeIndex === 11 ? " active" : "not-active"}> 				
										<a onClick={() => handleClick(11)}>Online Orders</a>								
								</li>								
								<li className={activeIndex === 12 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(12)}>Phone Orders</a>										
								</li>
								<li className={activeIndex === 13 ? " active" : "not-active"}> 		
										<a onClick={() => handleClick(13)}>Walk-ins</a>									
								</li>
								<li className={activeIndex === 14 ? " active" : "not-active"}> 		
										<a onClick={() => handleClick(14)}>Add New Order</a>									
								</li>
								<li className={activeIndex === 15 ? " active" : "not-active"}> 		
										<a onClick={() => handleClick(15)}>Sales Returns</a>									
								</li>
							</ul>
						</div>
					</li>
					{/*	<li className={activeIndex === 2 ? " active" : ""}>
						<a onClick={() => handleClick(2)}>Create Order</a>
					</li>  */}
					<li>
						<a  onClick={handleCatalogClick}>Catalog</a> 
						<div className= { catalogTab ? "tab-pane fade active show" : "d-none "} >	
							<ul className="flex-column admin-sublist" role="tablist">
								<li className={activeIndex === 31 ? " active" : "not-active"}> 				
										<a onClick={() => handleClick(31)}>Manage Products</a>								
								</li>								
								<li className={activeIndex === 32 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(32)}>Add New Product</a>										
								</li>
								<li className={activeIndex === 33 ? " active" : "not-active"}> 		
										<a onClick={() => handleClick(33)}>View Categories</a>									
								</li>
								<li className={activeIndex === 34 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(34)}>Add New Category</a>	
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a  onClick={handleCustomerClick}>Customer</a> 
						<div className= { customerTab ? "tab-pane fade active show" : "d-none "} >	
							<ul className="flex-column admin-sublist" role="tablist">
								<li className={activeIndex === 41 ? " active" : "not-active"}> 				
										<a onClick={() => handleClick(41)}>Manage Customers</a>								
								</li>								
								<li className={activeIndex === 42 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(42)}>Add New Customer</a>										
								</li>
								<li className={activeIndex === 43 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(43)}>Manage Payments </a>										
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a  onClick={handleSupplierClick}>Supplier</a> 
						<div className= { supplierTab ? "tab-pane fade active show" : "d-none "} >	
							<ul className="flex-column admin-sublist" role="tablist">
								<li className={activeIndex === 51 ? " active" : "not-active"}> 				
										<a onClick={() => handleClick(51)}>Manage Suppliers</a>								
								</li>								
								<li className={activeIndex === 52 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(52)}>Add New Supplier</a>										
								</li>
								<li className={activeIndex === 53 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(53)}>Purchase Entry </a>										
								</li>
								<li className={activeIndex === 54 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(54)}>Purchase Return </a>										
								</li>
								<li className={activeIndex === 55 ? " active" : "not-active"}> 
										<a onClick={() => handleClick(55)}>Manage Purchases </a>										
								</li>
							</ul>
						</div>
					</li>	
					<li>
						<a onClick={handleReportsClick}>Reports</a>
						<div className= { reportsTab ? "tab-pane fade active show" : "d-none "} >	
							<ul className="flex-column admin-sublist" role="tablist">
								<li className={activeIndex === 61 ? " active" : "not-active"}> 				
										<a onClick={() => handleClick(61)}>Reports</a>								
								</li>								
								
							</ul>
						</div>
					</li>
					<li className="">
						<Link href="/page-login"><a className="">Logout</a></Link>
					</li>
				</ul>
			</div>
		
    </div>    

	<div className="row">
		<div className="col-md-2 dashboard-admin-footer">
		</div>
	</div>

</>
)}	



const mapStateToProps = (state) => ({
		catalogTab: state.adminSideBar.catalogTab,
		supplierTab: state.adminSideBar.supplierTab,
		ordersTab: state.adminSideBar.ordersTab,
		reportsTab: state.adminSideBar.reportsTab,
		customerTab: state.adminSideBar.customerTab
});
 
 
const mapDispatchToProps = {
	toggleCatalogTab,
	toggleSupplierTab,
	toggleOrdersTab,
	toggleReportsTab,
	toggleCustomerTab
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSideBarComponent);