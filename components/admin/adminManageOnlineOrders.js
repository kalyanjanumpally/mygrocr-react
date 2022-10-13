import { useState, useEffect } from "react";
import Link from "next/link";
import AdminButtonOrder from "./adminButtonOrder";
import AdminViewOrder from "./adminViewOrder"
import CustomerDialogBox from "./adminCustomerDialogBox";
import {useRouter} from "next/router";
import * as APIs from "./../../util/springAPIs";

const ComponentManageOnlineOrders = () => {
	
	const [dtoOrders, setDtoOrders] = useState([]);
	const [orderId, setOrderId] = useState("");
	const [activeOrder, setActiveOrder] = useState("");
	const [activeOrderIndex, setActiveOrderIndex] = useState(0);
	const [orderTitle, setOrderTitle] = useState("");
	const [titleButtonsDisp, setTitleButtonsDisp] = useState(0);
	const [search, setSearch] = useState("");
	const [selectedType, setSelectedType] = useState("customer");
	
	const [orderDisp, setOrderDisp] = useState([]);
	const [clickedOrder, setClickedOrder] = useState([]);
		
	const [searchCustomerResult, setSearchCustomerResult] = useState("");	
	const [selectedCustomer, setSelectedCustomer] = useState("");
	const [custSearchDisp, setCustSearchDisp] = useState(false);
	
	//Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(50);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	const router = useRouter();
			
 	useEffect(() => {	
		if(selectedCustomer == "") {
			let orderSourceType = "Online"
			const ordersListUrl = "http://localhost:8083/api/get-orders/"+ orderSourceType + "/" + itemsPerPage + "/" + startIndex; 		
			const fetchOnlineOrdersData = async () => {
				try {
					const response = await fetch(ordersListUrl);
					const json = await response.json();
					if(startIndex ==0) {
						setCount(json.countOfOrders);
					}
					setDtoOrders(json.dtos);
					} 
				catch (error) {
					alert("From adminManageOnlineOrders: fetching orders, Server-side error. Please try later.")
				}			
			}			
			fetchOnlineOrdersData(); 	
		}	
	},[currentPage]) 
	
	 useEffect(() => {
		 
		 if(selectedCustomer != "") {
			let orderSourceType = "Online";
		//	const ordersOfCustomerUrl = "http://localhost:8083/api/get-orders-of-customer/"+ orderSourceType + "/" + selectedCustomer.customerId  + "/" + itemsPerPage + "/" + startIndex; 		
			
			const ordersOfCustomerUrl = APIs.ordersOfCustomerUrl + orderSourceType + "/" + selectedCustomer.customerId  + "/" + itemsPerPage + "/" + startIndex; 		
			
			const fetchCustomerOrdersData = async () => {
				try {
					const response = await fetch(ordersOfCustomerUrl);
					const json = await response.json();
					if(startIndex ==0) {
						setCount(json.countOfOrders);
					}
					setDtoOrders(json.dtos);
					} 
				catch (error) {
					alert("From adminManageOnlineOrders: fetching orders, Server-side error. Please try later.")
				}			
			}		
			fetchCustomerOrdersData(); 
		 }	
		
	},[selectedCustomer, currentPage]) 
	
	
	const handlePendingOrders = () => {	

		let orderSourceType = "Online"
	
	//	const pendingOrdersListUrl = "http://localhost:8083/api/pending-orders/" + orderSourceType; 

		const pendingOrdersListUrl = APIs.pendingOrdersListUrl + orderSourceType; 
		
		const fetchPendingOnlineOrdersData = async () => {
			try {
				const response = await fetch(pendingOrdersListUrl);
				const json = await response.json();
				setDtoOrders(json);
				} 
			catch (error) {
				alert("From adminManageOnlineOrders: fetching orders, Server-side error. Please try later.")
			}			
		}			
		fetchPendingOnlineOrdersData(); 
	}
	
	const handleSearch = () => {
		
		if(search.length > 0 ) {		
			if(selectedType == "orderId" && typeof(parseInt(search)) == "number" ) {
				
				let orderSourceType = "Online";
				
			//	const findOnlineOrderByIdUrl = "http://localhost:8083/api/find-order-by-orderid/"+ orderSourceType + "/"  + search; 

				const findOnlineOrderByIdUrl = APIs.findOnlineOrderByIdUrl + orderSourceType + "/"  + search; 
				
				const fetchOnlineOrderByIdData = async () => {
					try {
						const response = await fetch(findOnlineOrderByIdUrl);		
						if(response.headers.get('content-type')?.includes('application/json')){
							const json = await response.json();
							const tempOrder = [];
							tempOrder.push(json)
							setDtoOrders(tempOrder); 
						}
						else {
							alert("Order does not exist.");
						}
					} 
					catch (error) {
						alert("From adminManageOnlineOrders: fetching orders, Server-side error. Please try later.")
					}			
				}			
				fetchOnlineOrderByIdData(); 	
			}
			else if(selectedType == "customer") {	
				setCustSearchDisp(true);
				setCurrentPage(1);
			//	const searchCustomerUrl = "http://localhost:8083/api/search-customer/" + search;
				
				const searchCustomerUrl = APIs.searchCustomerUrl + search;
				
				const searchCust = async () => {
					try {
							const response = await fetch(searchCustomerUrl);
							const json = await response.json();

							if(!response.ok) {
								alert("HTTP Error. Please try later.");
							}
							else
								setSearchCustomerResult(json);	
					} 
					catch (error) {
						console.log("error: "+ error)
						alert("HTTP/Network error. Please try later.");
					}			
				}			
				searchCust();				
			}
		}		
	}
	
	useEffect(() => {	
		
		if(Object.keys(dtoOrders).length >0) {
			
			const tempOrderDisp=[];
			tempOrderDisp[activeOrderIndex] = true;	
			setOrderDisp(tempOrderDisp);
			
			const tempClickedOrder=[];
			tempClickedOrder[activeOrderIndex] = true;
			setClickedOrder(tempClickedOrder);
			
			setOrderTitle("#" + dtoOrders[activeOrderIndex].order.orderId + " - " + dtoOrders[activeOrderIndex].order.orderDeliveryStatus);
			
			if(dtoOrders[activeOrderIndex].order.orderDeliveryStatus == "Pending") {
				setTitleButtonsDisp(1);
			}
			else if(dtoOrders[activeOrderIndex].order.orderDeliveryStatus == "Delivered") {
				setTitleButtonsDisp(2);
			}
			else if(dtoOrders[activeOrderIndex].order.orderDeliveryStatus == "Cancelled") {
				setTitleButtonsDisp(3);
			}	
			else if(dtoOrders[activeOrderIndex].order.orderDeliveryStatus == "Returned") {
				setTitleButtonsDisp(4);
			}
		}
	
	},[activeOrderIndex, dtoOrders]) 
	
	
	const handleSelectedOrder= (x) => {		
		setActiveOrderIndex(x);		
	}
	
	const orderDataList = dtoOrders.map( (value, key) => (
		<>{ orderDisp[key] && <AdminViewOrder orderDetails={value}/> } </>
	))
	
  	const buttonsOrdersList = [];
	if(dtoOrders.length > 0) {
		
		for(let x in dtoOrders) {				
			buttonsOrdersList.push(<AdminButtonOrder dto={dtoOrders[x]}  handleSelectedOrder={handleSelectedOrder} clickedOrder={clickedOrder} x={x}/>);
		}			
	}  	

	const handleEditOrder = () => {		
		const editOrderUrl = "/admin/edit-order/" + dtoOrders[activeOrderIndex].order.orderId;
		window.open(editOrderUrl,'_blank');	
	}
	
	const handleDeliverOrder = () => {
		
	//	const orderDeliverUrl = "http://localhost:8083/api/order-deliver";	

		const orderDeliverUrl = APIs.orderDeliverUrl;	
		
		const deliveredOrderIdJSON = dtoOrders[activeOrderIndex].order.orderId;
					
		const requestOptions = {
			 method: 'PUT',
			 headers: { 'Content-Type': 'application/json' },
			 body: JSON.stringify(deliveredOrderIdJSON)
		};

		const orderDeliverRequest = async () => {
			try {
				const response = await fetch(orderDeliverUrl, requestOptions);
				
				if(!response.ok) {
					alert("Http Error. Please try again.")
				}
				else {	
					const tempDtoOrders = JSON.parse(JSON.stringify(dtoOrders));
					tempDtoOrders[activeOrderIndex].order.orderDeliveryStatus = "Delivered";
					setDtoOrders(tempDtoOrders);

				}
				
				} 
			catch (error) {
				alert("From adminMangaeOrders: fetching orders, Server-side error. Please try later.")
			}			
		}			
		orderDeliverRequest(); 
		
	}
	
	const handleCancelOrder = () => {
		
		const cancelOrderConfirmation = confirm("Are you sure to mark this order as Cancelled? This action is irreversible.");
			
		if(cancelOrderConfirmation == true) {
		//	const orderCancelUrl = "http://localhost:8083/api/order-cancel";
			
			const orderCancelUrl = APIs.orderCancelUrl
					
			const cancelledOrderIdJSON = dtoOrders[activeOrderIndex].order.orderId;
						
			const requestOptions = {
				 method: 'PUT',
				 headers: { 'Content-Type': 'application/json' },
				 body: JSON.stringify(cancelledOrderIdJSON)
			};

			const orderCancelRequest = async () => {
				try {
					const response = await fetch(orderCancelUrl, requestOptions);
					
					if(!response.ok) {
						alert("Http Error. Please try again.")
					}
					else {	
						const tempDtoOrders = JSON.parse(JSON.stringify(dtoOrders));
						tempDtoOrders[activeOrderIndex].order.orderDeliveryStatus = "Cancelled";
						setDtoOrders(tempDtoOrders);

					}
					
					} 
				catch (error) {
					alert("From adminMangaeOrders: fetching orders, Server-side error. Please try later.")
				}			
			}			
			orderCancelRequest(); 
		}
	}
	
	const handleReturnOrder = () => {
		
		const returnOrderConfirmation = confirm("Are you sure to mark this order as Returned? This action is irreversible.");
		
		if(returnOrderConfirmation == true) {
		//	const orderReturnUrl = "http://localhost:8083/api/order-return";
			
			const orderReturnUrl = APIs.orderReturnUrl;
					
			const returnedOrderIdJSON = dtoOrders[activeOrderIndex].order.orderId;
						
			const requestOptions = {
				 method: 'PUT',
				 headers: { 'Content-Type': 'application/json' },
				 body: JSON.stringify(returnedOrderIdJSON)
			};

			const orderReturnRequest = async () => {
				try {
					const response = await fetch(orderReturnUrl, requestOptions);
					
					if(!response.ok) {
						alert("Http Error. Please try again.")
					}
					else {	
						const tempDtoOrders = JSON.parse(JSON.stringify(dtoOrders));
						tempDtoOrders[activeOrderIndex].order.orderDeliveryStatus = "Returned";
						setDtoOrders(tempDtoOrders);

					}
					
					} 
				catch (error) {
					alert("From adminMangaeOrders: fetching orders, Server-side error. Please try later.")
				}			
			}			
			orderReturnRequest(); 
		}	
	}
	
	const handlePreviousOrdersList = () => {
		setCurrentPage(currentPage - 1);
	}
	
	const handleNextOrdersList = () => {
		setCurrentPage(currentPage + 1);
	}

	
return(
	
<>
	
	<div className="container">	 	
		
		<div className="row ml-10 mt-20 mb-10">
			<label style={{fontSize:"30px"}}> Online Orders </label>
		</div>	
		
		<div className="row">
			<div className="col-4 d-flex justify-content-end">

				<input type="text" className="input-admin mr-5" style={{height:"30px", width:"120px", borderRadius:"none", fontSize:"12px", background:"#ffffff"}}
						value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)} 
						onKeyDown={(e)=>{
						if(e.key === "Enter") handleSearch();
				}} />
				
				<select value={selectedType}   className="form-select py-0 " style={{height:"30px", width:"120px", borderRadius:"0px", backgroundColor:"#EDEEF0", fontSize:"12px"}}  
				onChange={(e) => setSelectedType(e.target.value)}>
					<option value="customer" selected> Customer </option>
					<option value="orderId" > Order No. </option>
				</select>
			</div>
		</div>	

		<hr className="my-1"/>

		<div className="row">  
			<div className="col-4" >
			
				<div className="mx-0 px-0 d-flex justify-content-end align-items-center" style={{display:"block", backgroundColor:"#5E72E3", height:"50px"}}>								
					<button type="button" onClick={handlePendingOrders} className="admin-manage-orders-button mr-10"> Pending </button>																				
				</div>					
				{buttonsOrdersList}	

				<div classNamee="d-inline-flex">					
					{ startIndex != 0 &&	
					<button type="button" className="mt-20" onClick={handlePreviousOrdersList} style={{
																					height: "30px",
																					width: "90px",
																					background: "#5E72E3",
																					color:"#ffffff",
																					fontSize: "12px",
																					border: "none"
																				}}
					> Previous </button> }
					
					{ startIndex < (count - itemsPerPage) &&	
						<button type="button" className="ml-5 mt-20" onClick={handleNextOrdersList} style={{
																					height: "30px",
																					width: "70px",
																					background: "#5E72E3",
																					color:"#ffffff",
																					fontSize: "12px",
																					border: "none"
																				}}
					> Next </button> }
				</div>							
			</div>
			
					
			<div className="col-8">
			
				<div className="mx-0 px-0 d-flex justify-content-between align-items-center" style={{display:"block", backgroundColor:"#5E72E3", height:"50px", color:"#ffffff", fontSize:"20px"}}>	
			
					<label className="ml-20"> {orderTitle} </label> 
													
					<div style={{display:"inline"}} className="mr-20">									
						{
							(titleButtonsDisp == 1) && 
							<><button type="button" onClick={handleEditOrder} className="admin-manage-orders-button mr-10"> Edit </button>
							<button type="button" onClick={handleDeliverOrder} className="admin-manage-orders-button mr-10"> Deliver </button> 
							<button type="button" onClick={handleCancelOrder} className="admin-manage-orders-button"> Cancel </button> </>
						}
						
						{
							(titleButtonsDisp == 2) && 
							<button type="button" onClick={handleReturnOrder} className="admin-manage-orders-button mr-10"> Return </button>
							
						}
						
					</div>																
					
				</div>
				
				{orderDataList}
			
			</div>
		</div>	
	</div>		
	
	{custSearchDisp && <CustomerDialogBox setCustSearchDisp={setCustSearchDisp} custSearchDisp={custSearchDisp} searchCustomerResult={searchCustomerResult} 
		setSearchCustomer={setSearch} setSelectedCustomer = {setSelectedCustomer} /> }
	
</>	
	
)}

export default ComponentManageOnlineOrders;