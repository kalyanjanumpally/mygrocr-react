import React from "react";
import { useEffect, useState } from "react";

const AdminViewOrder = (orderDetails) => {
	
	const [subTotal, setSubTotal] = useState("");
	
	const order = "";
	const orderDetailsData = [];
	const orderCreationDate = new Date();
	
//	const dateTime = JSON.stringify(order.dateTimeCreated);
	
 	if(Object.keys(orderDetails).length>0) {
		
		for(let x in orderDetails) {

			order = orderDetails[x].order;				
			orderCreationDate.setTime(Date.parse(order.dateTimeCreated));
			
	
			orderDetailsData = orderDetails[x].batches.map((orderEntry, key)=>(
			
			 <tr>
				<td> {orderEntry.batchProductName} </td>
				<td> {orderEntry.batchProductBrand} </td>		
				<td> {orderEntry.quantity} </td>		
				<td> {orderEntry.sellingPrice} </td>
				<td> {orderEntry.quantity * orderEntry.sellingPrice}</td>	
			</tr>	 
			))			
		}
	}   
	
return(	
	
<>
	<div className="ml-20" style={{height: "70vh"}}>
		<table className="admin-view-order">
			<thead>
				<tr style={{color:"#000000"}}> 
					 <th> Product </th> <th> Brand </th> 
					 <th> Quantity</th> <th> Unit Price </th> 
					 <th> Total </th>
				</tr>
			</thead>
			
			<tbody>
			
				{orderDetailsData}
				
				<tr style={{fontWeight:"700", color:"#000000"}}> <td></td> <td></td> <td></td>   <td> Sub-Total </td>        <td> {order.subTotal} </td> </tr>
				<tr style={{fontWeight:"700", color:"#000000"}}> <td></td> <td></td> <td></td>   <td> Shipping-Charges </td> <td> {order.shippingCharges} </td>  </tr>
				<tr style={{fontWeight:"700", color:"#000000"}}> <td></td> <td></td> <td></td>   <td> Total </td>            <td> {order.subTotal + order.shippingCharges} </td>   </tr>
			
			</tbody>
			
			
			
		</table>
		<div className="row">
			<div className="col-12">
				{ order.comments != null && <>
					<label style={{fontWeight:"700", fontSize:"12px", color:"#000000"}}> Comments: </label> 
					<label className="ml-10 px-5" style={{fontSize:"12px", color:"#000000", backgroundColor:"#ffd400"}}> {order.comments} </label> 
				 </> }
			</div>
		</div>
		
		<hr className="my-0"/>
		
		<div className="row">
			<div className="col-6">
				<p className="my-2" style={{fontWeight:"700", fontSize:"12px", color:"#000000"}}> Payment Details: {order.payments[order.payments.length-1].paymentMode} </p> 
			</div>
			<div className="col-6">
				<p className="my-2" style={{fontWeight:"700", fontSize:"12px", color:"#000000"}}>
						Order Date:	 {orderCreationDate.toLocaleString('en-GB')}
				</p> 
			</div>	
		</div>
		
		<div className="row">
			<div className="col-6" style={{border:"1px solid #36454F"}} >
				<p style={{fontSize:"12px", fontWeight:"700", color:"#000000"}}> Customer Details: </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.fullName} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.phoneNo1} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.phoneNo2} </p>
				<p style={{fontSize:"12px", marginBottom:"5px", color:"#000000"}}> {order.customer.email} </p> 
			</div>
			
			<div className="col-6" style={{border:"1px solid #36454F"}} >
				<p style={{fontSize:"12px", fontWeight:"700", color:"#000000"}}> Shipping Details:  </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.streetAddress} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.postalCode} </p>
				<p style={{fontSize:"12px", marginBottom:"-5px", color:"#000000"}}> {order.customer.city} </p>
				<p style={{fontSize:"12px", marginBottom:"5px", color:"#000000"}}> {order.customer.state} </p>
			</div>
		</div>				
	</div>	
		
</>
	
)}

export default AdminViewOrder;
