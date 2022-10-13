import React from "react";
import { useState } from "react";

const AdminButtonPurchase = ({dto, handleSelectedPurchase, x, clickedPurchase}) => {

	let dd = dto.purchaseInvoice.dateCreated.substring(8);
	let mm = dto.purchaseInvoice.dateCreated.substring(5,7);
	let yyyy = dto.purchaseInvoice.dateCreated.substring(0,4);
	
	let purchaseDate = new Date(dto.purchaseInvoice.dateCreated);
	let todayDate = new Date();
	
	let difference = todayDate.setUTCHours(0, 0, 0, 0) - purchaseDate.setUTCHours(0, 0, 0, 0);
	let days = Math.floor(difference / (1000 * 3600 * 24));

return(
<>

		<div onClick={()=>handleSelectedPurchase(x)} className="row" id={ clickedPurchase[x] ? "admin-button-order-clicked" : "admin-button-order"}>	

			<div className="col-3 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px"}} className="admin-button-order-inner"> # {dto.purchaseInvoice.purchaseInvoiceId} </label>
				
			</div>
			
			<div className="col-5 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px", marginRight:"-10px", marginLeft:"-10px"}} className="admin-button-order-inner" >  {dto.purchaseInvoice.supplier.supplierName}   </label>
			
			</div>
			
			<div className="col-4 mt-10 d-inline-flex flex-column align-items-start">
				<label style={{fontSize:"13px", marginBottom:"-3px", marginRight:"-10px", marginLeft:"-10px"}} className="admin-button-order-inner" >  {dto.purchaseInvoice.amount} </label>
				<label style={{fontSize:"11px", fontWeight:"700", marginRight:"-10px", marginLeft:"-10px"}}>  {dd + '-' + mm + '-' + yyyy} / {days} days </label>
			</div>
			
		</div>	


</>

)}

export default AdminButtonPurchase;