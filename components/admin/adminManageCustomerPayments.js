import { useState, useEffect } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import CustomerOrderDetailsDialog from "./customerOrderDetailsDialog";
import CustomerPaymentsDialog from "./adminCustomerPaymentsDialog";
import * as APIs from "./../../util/springAPIs";

const ComponentManageCustomerPayments = () => {
	
	const [orders, setOrders] = useState([]);
	const [pendingPaymentsList, setPendingPaymentsList] = useState([]);
	const [customerOrdersDisp, setCustomerOrdersDisp] = useState(false);
	const [customerOrdersTableData, setCustomerOrdersTableData] = useState([]);
	const [selectedCustomerName, setSelectedCustomerName] = useState("");
	const [selectedCustomerReceivePayment, setSelectedCustomerReceivePayment] = useState("");
	const [customerPaymentsDialogDisp, setCustomerPaymentsDialogDisp] = useState(false);
	const [paymentsData, setPaymentsData] = useState([]);
	const [total, setTotal] = useState(0);
	const [refresh, setRefresh] = useState(false);

	const orderCreationDate = new Date();
	
	
	useEffect(() => {		
	//If Categories data is not available in redux store, then only fetch data..
		
	//	const ordersWithPendingPaymentsUrl = "http://localhost:8083/api/orders-with-pending-payments" 	

		const ordersWithPendingPaymentsUrl = APIs.ordersWithPendingPaymentsUrl;
		
		const fetchOrdersPendingPaymentsData = async () => {
			try {
				const response = await fetch(ordersWithPendingPaymentsUrl);
				const json = await response.json();
				setOrders(json);
				} 
			catch (error) {
				alert("Server-side error. Please try later.")
			}			
		}			
		fetchOrdersPendingPaymentsData(); 	
			
	},[refresh]);
	
	const customerNames = new Set();
	

	
	useEffect(() => {
		
		if(orders.length >0) {	
			for(let x in orders){
				if(!customerNames.has(orders[x].customer.fullName)) {	
					customerNames.add(orders[x].customer.fullName)
				}	
			}
		
			const pendingPaymentsListEntries = [];
			let counter = 1;		
			
			customerNames.forEach(customerName => {	
				const totalCustomerPendingPayment = 0;
				for(let x in orders){
					if(orders[x].customer.fullName == customerName) {	
						if(orders[x].salesReturnId == null) {
							totalCustomerPendingPayment = totalCustomerPendingPayment + orders[x].pendingPayment;
						}		
					}
				}
				const tempPendingPaymentsListEntries = {};
				tempPendingPaymentsListEntries.srNo = counter;
				tempPendingPaymentsListEntries.customerName = customerName;
				tempPendingPaymentsListEntries.pendingPayment = totalCustomerPendingPayment;
				counter = counter + 1;
				
				pendingPaymentsListEntries.push(tempPendingPaymentsListEntries)	
			})
			
			setPendingPaymentsList(pendingPaymentsListEntries);
		}
	},[orders]);
	
	
	useEffect(() => {
		
		if(paymentsData.length > 0){
		
			const customerOrdersList = []

			for(let x in orders){
				if(orders[x].customer.fullName == selectedCustomerReceivePayment && orders[x].salesReturnId == null) {	
					customerOrdersList.push(orders[x])
				}	
			}	
			
			const orderPaymentsReceived = new Map();
			const balance = 0;
			
			for(let x in paymentsData) {
				if(paymentsData[x].paymentMode != "Sale On Credit") {	
					balance = balance + parseFloat(paymentsData[x].amount);	
				}
			}
			
			while(parseFloat(balance) > 0) {	
				for(let x in customerOrdersList) {
					
					if( (parseFloat(balance) - parseFloat(customerOrdersList[x].pendingPayment)) > 0){	
						balance = parseFloat(balance) - parseFloat(customerOrdersList[x].pendingPayment);
						orderPaymentsReceived.set(customerOrdersList[x].orderId, customerOrdersList[x].pendingPayment);	
					}
					else {
						orderPaymentsReceived.set(customerOrdersList[x].orderId, (parseFloat(balance) ) );	
						balance = 0;
						break;
					}
				}	
			}			
		
			const paymentsDataTemp = JSON.parse(JSON.stringify(paymentsData));	
			const orderwisePaymentsReceived = [];		
			
			orderPaymentsReceived.forEach((amount, orderId) => {
				
				const amountTemp = JSON.parse(JSON.stringify(amount));
				for(let x in paymentsDataTemp) {
					if( parseFloat(paymentsDataTemp[x].amount) >= parseFloat(amountTemp)   ) {	
						if(amountTemp < 0.1) {
							break;
						}
						
						paymentsDataTemp[x].amount = parseFloat(paymentsDataTemp[x].amount) - parseFloat(amountTemp);
						
						const tempEntry = {};
						tempEntry.orderId = orderId;
						tempEntry.amount = amountTemp;
						tempEntry.paymentMode = paymentsDataTemp[x].paymentMode;
						
						orderwisePaymentsReceived.push(tempEntry);
						break;					
					}
					else {

						if( parseFloat(paymentsDataTemp[x].amount) > 0 ) {
						
							const tempEntry = {};
							tempEntry.orderId = orderId;
							tempEntry.amount = parseFloat(paymentsDataTemp[x].amount);
							tempEntry.paymentMode = paymentsDataTemp[x].paymentMode;
							orderwisePaymentsReceived.push(tempEntry);
							
							amountTemp = parseFloat(amountTemp) - parseFloat(paymentsDataTemp[x].amount);
							paymentsDataTemp[x].amount = 0;	
						}								
					}
				}					
			})			
			
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderwisePaymentsReceived)
			};
			
		//	const salesPaymentsUrl = "http://localhost:8083/api/save-customer-payments/";

			const salesPaymentsUrl = APIs.salesPaymentsUrl;
			
			const savePayments = async () => {
				try {
					const response = await fetch(salesPaymentsUrl, requestOptions);
				//	const jsonPurchaseInvoice = await response.json();

					if(!response.ok) {
						alert("HTTP error.")
					}
					else {
						alert("Customer Payments Updated Successfully.")
						setRefresh(!refresh);
					}	
				} 
				catch (error) {
					alert("From adminUpdateOrder: updating order, HTTP/ Network error. Please try later.")
				}			
			}			
			savePayments(); 	
				
		}		
	},[paymentsData]);
		
	
	const handleOrderDetails = (customerName) => {
		
		setCustomerOrdersDisp(true);
		
		const customerOrders = [];
		for(let x in orders) {
			if( orders[x].customer.fullName == customerName) {
				customerOrders.push(orders[x]);
			}	
		}
		
		const tempCustomerOrdersTableData = [];
		
		for(let x in customerOrders) {	
			const paymentsTableData = [];
	
			for(let y in customerOrders[x].payments) {

				if(y != customerOrders[x].payments.length-1) {
					paymentsTableData.push(
					<div>
						<label className="mx-2"> 
							{customerOrders[x].payments[y].paymentDate.substring(8) + "-" + customerOrders[x].payments[y].paymentDate.substring(5,7) 
							+ "-" + customerOrders[x].payments[y].paymentDate.substring(0,4)} 
						 </label>
						 <label> | </label>
						<label className="mx-2"> {customerOrders[x].payments[y].amount} </label>
						<label> | </label>
						<label className="mx-2"> {customerOrders[x].payments[y].paymentMode} </label>
						<hr className="my-0 py-0"/>
					</div>
					)
				}
				else {
					paymentsTableData.push(
					<div>
						<label className="mx-2"> 
							{customerOrders[x].payments[y].paymentDate.substring(8) + "-" + customerOrders[x].payments[y].paymentDate.substring(5,7) 
							+ "-" + customerOrders[x].payments[y].paymentDate.substring(0,4)} 
						 </label>
						 <label> | </label>
						<label className="mx-2"> {customerOrders[x].payments[y].amount} </label>
						<label> | </label>
						<label className="mx-2"> {customerOrders[x].payments[y].paymentMode} </label>
					
					</div>
					)
					
				}
			}
			
			//orderCreationDate = new Date(customerOrders[x].dateTimeCreated);
			orderCreationDate.setTime(Date.parse(customerOrders[x].dateTimeCreated));
			

			tempCustomerOrdersTableData.push(
				<tr style={{fontSize:"16px", fontWeight:"700", backgroundColor:"#FFFDD0"}}>
					<td id="admin-table"> {customerOrders[x].orderId} </td>
					<td id="admin-table"> {orderCreationDate.toLocaleDateString("en-GB")} </td>					
					 {customerOrders[x].salesReturnId ?  <td id="admin-table"> Return- {customerOrders[x].salesReturnId} </td>  :  <td id="admin-table"> Sale </td>  } 
					<td id="admin-table"> {customerOrders[x].subTotal + customerOrders[x].shippingCharges}  </td>
					<td id="admin-table"> {customerOrders[x].pendingPayment} </td>
					<td id="admin-table"> {paymentsTableData} </td>
				</tr>
			)	
		}
		setCustomerOrdersTableData(tempCustomerOrdersTableData);
		setSelectedCustomerName(customerName);
	}
	
	const handleReceivePayments = (customerName) => {
		
		setCustomerPaymentsDialogDisp(true);
		
		for(let x in pendingPaymentsList) {
			if(pendingPaymentsList[x].customerName == customerName) {
				setTotal(pendingPaymentsList[x].pendingPayment);
			}			
		}	
		setSelectedCustomerReceivePayment(customerName);		
	}
	
	
	const pendingPaymentsTableData = [];
	
	for(let x in pendingPaymentsList) {
		
		pendingPaymentsTableData.push(
		
			<tr style={{color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"}}>
				<td id="admin-table"> {pendingPaymentsList[x].srNo} </td>
				<td id="admin-table"> {pendingPaymentsList[x].customerName} </td>
				<td id="admin-table"> {pendingPaymentsList[x].pendingPayment} </td>
				<td id="admin-table" className="py-0"> 
					<button type="button" onClick={() => handleOrderDetails(pendingPaymentsList[x].customerName)} className="admin-manage-orders-button"> Details </button> 
				</td>	
				<td id="admin-table"  className="py-0"> 
					<button type="button" onClick={() => handleReceivePayments(pendingPaymentsList[x].customerName)} className="admin-manage-orders-button"> Receive </button>
				</td>
			</tr>
		)
	}

	
	
return(
<>

	<div className="row">
		<div className="col-12 mt-20 d-flex justify-content-center align-items-center" style={{backgroundColor:"#5E72E3", height:"40px"}}>
			<label className="" style={{color:"#ffffff", fontSize:"20px", fontWeight:"500"}}> Pending Payments </label>
		</div>	
	</div>
	
	<div className="row">	
		<div className="col-1">
		</div>
		
		<div className="col-10">
			<table className="table mt-20" style={{tableLayout:"fixed"}}>
					<thead style={{
						border: "1px solid #ffffff",	
						position: "sticky",
						top: 0,																	
						right: 0,
						fontWeight:"500",
						fontSize:"16px",
						color: "#ffffff",
						backgroundColor: "#2E3D50"}}> 
					<tr> 
						<th id="admin-table-white-border" style={{ width:"80px" }}> Sr. No. </th> 
						<th id="admin-table-white-border" style={{ width:"150px" }}> Customer </th> 
						<th id="admin-table-white-border" style={{ width:"80px" }}> Amount </th> 
						<th id="admin-table-white-border" style={{ width:"80px" }}> Details </th> 
						<th id="admin-table-white-border" style={{ width:"120px" }}> Receive Payment </th>
					</tr>
				</thead>	
				<tbody>
				  {pendingPaymentsTableData}  				
				</tbody>
			</table>
		</div>	
	</div>
	
	
	{ customerOrdersDisp &&  <CustomerOrderDetailsDialog  setCustomerOrdersDisp={setCustomerOrdersDisp} customerOrdersTableData={customerOrdersTableData} customerName={selectedCustomerName} /> }

	{ customerPaymentsDialogDisp &&  <CustomerPaymentsDialog setOrderPaymentDisp={setCustomerPaymentsDialogDisp} total={total} setPaymentsData={setPaymentsData} 
	  customerName={selectedCustomerReceivePayment} />}
	
</>	
	
)}

export default ComponentManageCustomerPayments;