import React from "react";
import { useState } from "react";

const AdminButtonOrder = ({dto, handleSelectedOrder, x, clickedOrder}) => {
	
	let orderDate = new Date(dto.order.dateTimeCreated);
	let todayDate = new Date();
	
	let difference = todayDate.setUTCHours(0, 0, 0, 0) - orderDate.setUTCHours(0, 0, 0, 0);
	let days = Math.ceil(difference / (1000 * 3600 * 24));


return(
<>

		<div onClick={()=>handleSelectedOrder(x)} className="row" id={ clickedOrder[x] ? "admin-button-order-clicked" : "admin-button-order"}>	

			<div className="col-3 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px"}} className="admin-button-order-inner"> # {dto.order.orderId} </label>
				<label style={{fontSize:"11px", fontWeight:"700"}}>  {dto.order.orderDeliveryStatus} </label>
			</div>
			
			<div className="col-5 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px", marginRight:"-10px", marginLeft:"-10px"}} className="admin-button-order-inner" >  {dto.order.customer.fullName}   </label>
				<label style={{fontSize:"11px", fontWeight:"700", marginRight:"-10px", marginLeft:"-10px"}}>  {dto.order.payments[0].paymentMode}   </label>
			</div>
			
			<div className="col-4 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px", marginRight:"-10px", marginLeft:"-10px"}} className="admin-button-order-inner" >  {dto.order.subTotal + dto.order.shippingCharges} </label>
				<label style={{fontSize:"11px", fontWeight:"700", marginRight:"-10px", marginLeft:"-10px"}}>  {orderDate.toLocaleDateString('en-GB')} / {days} days </label>
			</div>
			
		</div>	


</>

)}

export default AdminButtonOrder;