import { useState, useEffect } from "react";
import Link from "next/link";
import AdminButtonPurchase from "./adminButtonPurchase";
import AdminViewPurchase from "./adminViewPurchase"
import CustomerDialogBox from "./adminCustomerDialogBox";
import {useRouter} from "next/router";
import * as APIs from "./../../util/springAPIs";

const ComponentManagePurchases = () => {
	
	const [dtoPurchases, setDtoPurchases] = useState([]);
	const [purchaseInvoiceId, setPurchaseInvoiceId] = useState("");
	const [activePurchase, setActivePurchase] = useState("");
	const [activePurchaseIndex, setActivePurchaseIndex] = useState(0);
	const [purchaseTitle, setPurchaseTitle] = useState("");
//	const [search, setSearch] = useState("");
	const [selectedType, setSelectedType] = useState("customer");
	
	const [purchaseDisp, setPurchaseDisp] = useState([]);
	const [clickedPurchase, setClickedPurchase] = useState([]);
		
//	const [searchCustomerResult, setSearchCustomerResult] = useState("");	
//	const [selectedCustomer, setSelectedCustomer] = useState("");
	
	//Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(50);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	const router = useRouter();
			
 	useEffect(() => {	

		//	const purchasesListUrl = "http://localhost:8083/api/get-purchases/" + itemsPerPage + "/" + startIndex; 	

			const purchasesListUrl = APIs.purchasesListUrl + itemsPerPage + "/" + startIndex; 
			
			const fetchOnlinePurchasesData = async () => {
				try {
					const response = await fetch(purchasesListUrl);
					const json = await response.json();
					if(startIndex ==0) {
						setCount(json.countOfPurchases);
					}
					setDtoPurchases(json.dtos);
					} 
				catch (error) {
					alert("From adminManageOnlinePurchases: fetching purchases, Server-side error. Please try later.")
				}			
			}			
			fetchOnlinePurchasesData(); 	
			
	},[currentPage]) 
	
	
/*	const handlePendingPurchases = () => {	

		let purchaseSourceType = "Online"
	
		const pendingPurchasesListUrl = "http://localhost:8083/api/pending-purchases/" + purchaseSourceType; 		
		const fetchPendingOnlinePurchasesData = async () => {
			try {
				const response = await fetch(pendingPurchasesListUrl);
				const json = await response.json();
				setDtoPurchases(json);
				} 
			catch (error) {
				alert("From adminManageOnlinePurchases: fetching purchases, Server-side error. Please try later.")
			}			
		}			
		fetchPendingOnlinePurchasesData(); 
	} */
	

	
	useEffect(() => {	
		
		if(Object.keys(dtoPurchases).length >0) {
			
			const tempPurchaseDisp=[];
			tempPurchaseDisp[activePurchaseIndex] = true;	
			setPurchaseDisp(tempPurchaseDisp);
			
			const tempClickedPurchase=[];
			tempClickedPurchase[activePurchaseIndex] = true;
			setClickedPurchase(tempClickedPurchase);
			
			setPurchaseTitle("#" + dtoPurchases[activePurchaseIndex].purchaseInvoice.purchaseInvoiceId);
			
		}
	
	},[activePurchaseIndex, dtoPurchases]) 
	
	const handleSelectedPurchase= (x) => {		
		setActivePurchaseIndex(x);		
	}
	
	const purchaseDataList = dtoPurchases.map( (value, key) => (
		<>{ purchaseDisp[key] && <AdminViewPurchase purchaseDetails={value}/> } </>
	))
	
  	const buttonsPurchasesList = [];
	if(dtoPurchases.length > 0) {
		
		for(let x in dtoPurchases) {				
			buttonsPurchasesList.push(<AdminButtonPurchase dto={dtoPurchases[x]}  handleSelectedPurchase={handleSelectedPurchase} clickedPurchase={clickedPurchase} x={x}/>);
		}			
	}  	

	const handleEditPurchase = () => {		
		const editPurchaseUrl = "/admin/edit-purchase/" + dtoPurchases[activePurchaseIndex].purchaseInvoice.purchaseInvoiceId;
		window.open(editPurchaseUrl,'_blank');	
	}
	
	
	const handlePreviousPurchasesList = () => {
		setCurrentPage(currentPage - 1);
	}
	
	const handleNextPurchasesList = () => {
		setCurrentPage(currentPage + 1);
	}

	
return(
	
<>
	
	<div className="container">	 	
		
		<div className="row ml-10 mt-20 mb-10">
			<label style={{fontSize:"30px"}}> Purchase Invoices </label>
		</div>	
		
		<div className="row">
			<div className="col-4 d-flex justify-content-end">

				
				
				
			</div>
		</div>	

		<hr className="my-1"/>

		<div className="row">  
			<div className="col-4" >
			
				<div className="mx-0 px-0 d-flex justify-content-end align-items-center" style={{display:"block", backgroundColor:"#5E72E3", height:"50px"}}>								
																								
				</div>					
				{buttonsPurchasesList}	

				<div classNamee="d-inline-flex">					
					{ startIndex != 0 &&	
					<button type="button" className="mt-20" onClick={handlePreviousPurchasesList} style={{
																					height: "30px",
																					width: "90px",
																					background: "#5E72E3",
																					color:"#ffffff",
																					fontSize: "12px",
																					bpurchase: "none"
																				}}
					> Previous </button> }
					
					{ startIndex < (count - itemsPerPage) &&	
						<button type="button" className="ml-5 mt-20" onClick={handleNextPurchasesList} style={{
																					height: "30px",
																					width: "70px",
																					background: "#5E72E3",
																					color:"#ffffff",
																					fontSize: "12px",
																					bpurchase: "none"
																				}}
					> Next </button> }
				</div>							
			</div>
			
					
			<div className="col-8">
			
				<div className="mx-0 px-0 d-flex justify-content-between align-items-center" style={{display:"block", backgroundColor:"#5E72E3", height:"50px", width:"1100px", color:"#ffffff", fontSize:"20px", overflow:"visible"}}>	
			
					<label className="ml-20"> {purchaseTitle} </label> 													
					<div style={{display:"inline"}} className="mr-20">																
							<button type="button" onClick={handleEditPurchase} className="admin-manage-orders-button mr-10"> Edit </button>							
					</div>																					
				</div>
				
				{purchaseDataList}
			
			</div> 
		</div>	
	</div>		
</>	
	
)}

export default ComponentManagePurchases;