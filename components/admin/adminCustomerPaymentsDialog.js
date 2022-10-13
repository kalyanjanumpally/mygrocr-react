import React from "react";
import Draggable from 'react-draggable';
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";


const CustomerPaymentsDialog = ({ setOrderPaymentDisp, total, setPaymentsData, customerName }) => {

	const [formErrors, setFormErrors] = useState({});
	const formErrorsRef = useRef({});
	const isSubmit = useRef(false);
	
	const [amountInput, setAmountInput] = useState(0);
	const [paymentModeInput, setPaymentModeInput] = useState("")
	const [amountsPaid, setAmountsPaid] = useState([]);
	const [paymentModes, setPaymentModes] = useState([]);
	const [balance, setBalance] = useState(total);

	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		
		if(amountInput.length > 0 && paymentModeInput.length > 0) {
		
			const getSum = (total, num) => {
				return (total + parseFloat(num));
			}
			
			const tempAmountsPaid = JSON.parse(JSON.stringify(amountsPaid));
			tempAmountsPaid.push(amountInput);	
			setAmountsPaid(tempAmountsPaid); 
			
			const tempPaymentModes = JSON.parse(JSON.stringify(paymentModes));
			tempPaymentModes.push(paymentModeInput);
			setPaymentModes(tempPaymentModes);
			
			const tempBalance = (total - tempAmountsPaid.reduce(getSum, 0)).toFixed(2);
			setBalance(tempBalance);	

			setAmountInput(0);
			setPaymentModeInput("");
		}		
	}	
	
	const paymentsTableData = [];
	
	for (let x in amountsPaid) {
		
		paymentsTableData.push(
			<tr>
				<td id="admin-table"> {amountsPaid[x]} </td>
				<td id="admin-table"> {paymentModes[x]} </td>	
			</tr>		
	)}
		
	const handleConfirm = () => {
		
		const totalPayment = 0;
		for(let x in amountsPaid) {
			totalPayment = totalPayment + parseFloat(amountsPaid[x]);
		}
		
		if(Math.abs(totalPayment - total) > 1) {
			alert("Total amount not matching with invoice amount.")
		}
		else {
			const confirmSubmission = confirm("Are you sure that you want to submit the entries?")
			
			if(confirmSubmission == true) {
				
				setOrderPaymentDisp(false)
				
				let tempPaymentsData = [];
				
				for (let x in amountsPaid) {				
					let tempPaymentsDataEntry = {};
					tempPaymentsDataEntry.amount = amountsPaid[x];
					tempPaymentsDataEntry.paymentMode = paymentModes[x];
					tempPaymentsData.push(tempPaymentsDataEntry);	
				}			
				setPaymentsData(tempPaymentsData);	
			}
		}			
	}	
			
return(


<>
{/*<Draggable> */}
		<div className="modal custom-modal  d-block"  >
			<div className="modal-dialog" >
				<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#9eb3c4"}}>

					
					<div className="modal-header py-0">
						<h5 className="modal-title py-0"> {customerName} : Rs. {total}  </h5>
						<button
							type="button"
							className="btn btn-close btn-close-white"
							style={{ color:"#ffffff"}}
							onClick={()=> setOrderPaymentDisp(false)}
						></button> 
					</div>
		
					<div className = "modal-body">
						<form className=" d-flex justify-content-around align-items-center mx-2 my-2" onSubmit={handleSubmit}>				
							

							<input type="text" style={{border:"1px solid #000000", borderRadius:"0px", width:"80px", height:"40px", backgroundColor:"#ffffff"}} placeholder="Amount" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
							
							<select className="form-control " style={{width:"200px",  height:"40px", border:"1px solid #000000", borderRadius:"0px", backgroundColor:"#ffffff"}} value={paymentModeInput}  onChange={(e) => setPaymentModeInput(e.target.value)}>
								<option value="" selected disabled hidden> Payment Mode </option>
								<option value="Cash"> Cash </option>
								<option value="Google Pay"> Google Pay </option>
								<option value="Paytm"> PayTM </option>
								<option value="Razor Pay"> RazorPay </option>
								<option value="PhonePe"> Phone Pe </option>
								<option value="Direct Account Transfer"> Direct Account Transfer </option>
								<option value="Upi"> UPI </option>
								<option value="Credit/Debit Card"> Credit/Debit Card </option>
								<option value="epayment"> epayment </option>
								<option value="Sale On Credit"> Sale On Credit </option>
								<option value="Return On Credit"> Return On Credit </option>
							</select>

							<button className="btn-admin" style={{width:"80px",  height:"40px", borderRadius:"5px", backgroundColor:"#36454F"}} type="submit">
								Add
							</button>				
						</form>	
						
						
						
						<div className="row">
							<div className="col-9">
								<table className="table mt-20">
									<thead style={{
										border: "1px solid #000000",
										backgroundColor: "#36454F",
										color:"#ffffff"}}>
										<tr > 
											<th scope="col" className="pl-4 " id="admin-table">Amount (Rs.)</th> 
											<th scope="col" className="pl-4 " id="admin-table">Payment Mode</th> 
											
										</tr>														
									</thead>	
									<tbody style={{backgroundColor: "#ffffff", color:"#000000", fontSize:"18px"}}>
										{paymentsTableData}					   				
									</tbody>	
								</table>
							</div>	
							<div className="col-3">
								<table className="table mt-20">
									<thead style={{
										border: "1px solid #000000",
										backgroundColor: "#36454F",
										color:"#ffffff"}}>
										<tr > 
											<th scope="col" className="pl-4 " id="admin-table">Balance (Rs.)</th> 

											
										</tr>														
									</thead>	
									<tbody style={{backgroundColor: "#ffffff", color:"#000000", fontSize:"18px"}}>
										<tr>
											<td id="admin-table"> {balance} </td>
										</tr>					   				
									</tbody>	
								</table>
							</div>
						</div>
						
					</div>
					
					<div className=" d-flex justify-content-end" style={{backgroundColor:"#36454F", height:"30px"}}>	
							<button type="button" onClick={handleConfirm} className="admin-manage-orders-button my-1 mx-1" style={{height:"25px", fontSize:"15px", fontWeight:"500"}}> Confirm </button> 
							
					</div>
				</div>
			</div>
		</div>	
{/*</Draggable> */}




</>
	
)}

export default CustomerPaymentsDialog;