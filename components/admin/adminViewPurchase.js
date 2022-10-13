import React from "react";
import { useEffect, useState } from "react";

const AdminViewPurchase = (purchaseDetails) => {
	
	const [subTotal, setSubTotal] = useState("");
	
	const purchase = "";
	const purchaseDetailsData = [];
	const purchaseCreationDate = new Date();
	
//	const dateTime = JSON.stringify(purchase.dateTimeCreated);
	
 	if(Object.keys(purchaseDetails).length>0) {
		
		for(let x in purchaseDetails) {

			purchase = purchaseDetails[x].purchaseInvoice;				
		//	purchaseCreationDate.setTime(Date.parse(purchase.dateTimeCreated));
	
			purchaseDetailsData = purchaseDetails[x].batches.map((purchaseEntry, key)=>(
			
			 <tr>
				<td> {purchaseEntry.batchProductName} </td>
				<td> {purchaseEntry.batchProductBrand} </td>
				<td> {purchaseEntry.batchNo} </td>
				<td> {purchaseEntry.quantity} </td>		
				<td> {purchaseEntry.batchPurchasePrice} </td>
				<td> {purchaseEntry.ppIncludesGST ? "YES" : "NO" } </td>
				<td> {purchaseEntry.mrp} </td>
				<td> {purchaseEntry.expiryDate} </td>
				<td> {purchaseEntry.gst} </td>
				<td> {purchaseEntry.ppIncludesGST ? purchaseEntry.quantity * purchaseEntry.batchPurchasePrice : purchaseEntry.quantity * purchaseEntry.batchPurchasePrice * (1 + purchaseEntry.gst/100) }</td>	
			</tr>	 
			))			
		}
	}   
	
return(	
	
<>
	<div className="ml-20" >
		<table className="admin-view-purchase">
			<thead>
				<tr style={{color:"#000000"}}> 
					 <th style={{minWidth:"150px"}}> Product </th> 
					 <th style={{minWidth:"160px"}}> Brand </th> 
					 <th style={{minWidth:"120px"}}> Batch </th>
					 <th style={{minWidth:"40px"}}> Qty</th> 
					 <th style={{minWidth:"120px"}}> Purchase Price (Rs)</th>
					 <th style={{minWidth:"50px"}}> Includes GST? </th> 
					 <th style={{minWidth:"40px"}}> MRP (Rs) </th>
					 <th style={{minWidth:"120px"}}> Expiry </th>
					 <th style={{minWidth:"50px"}}> Tax </th>
					 <th style={{minWidth:"50px"}}> Total </th>
				</tr>
			</thead>
			
			<tbody>			
				{purchaseDetailsData}
				<tr style={{fontWeight:"700", color:"#000000"}}>  <td></td>  <td></td>  <td></td>  <td> Total </td> <td> {purchase.amount} </td>   </tr>			
			</tbody>
			
			
			
		</table>
		<div className="row">
			<div className="col-12">
				
			</div>
		</div>
		
		<hr className="my-0"/>
		
		<div className="row">
			<div className="col-6">
				
			</div>
			<div className="col-6">
				<p className="my-2" style={{fontWeight:"700", fontSize:"12px", color:"#000000"}}> 
						 Purchase Date: {purchase.dateCreated?.substring(8) + "-" + purchase.dateCreated?.substring(5,7) + "-" + purchase.dateCreated?.substring(0,4)}  {purchaseCreationDate.toLocaleTimeString()}  
							 
				</p> 
			</div>	
		</div>
		
		<div className="row">
			<div className="col-6" style={{bpurchase:"1px solid #36454F"}} >
				<p style={{fontSize:"12px", fontWeight:"700", color:"#000000"}}> Supplier Details: </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {purchase.supplier.supplierName} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {purchase.supplier.phoneNo1} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {purchase.supplier.phoneNo2} </p>
				<p style={{fontSize:"12px", marginBottom:"5px", color:"#000000"}}> {purchase.supplier.email} </p> 
			</div>
		</div>				
	</div>	
		
</>
	
)}

export default AdminViewPurchase;
