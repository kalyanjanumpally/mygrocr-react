import React from "react";
import Draggable from 'react-draggable';
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";


const CustomerOrderDetailsDialog = ({ setCustomerOrdersDisp, customerOrdersTableData, customerName }) => {
	
	
return(


<>
<Draggable> 
		<div className="modal custom-modal  d-block" >
			<div className="modal-dialog" id="modal-customer-order-details" >
				<div className="modal-content pt-0 pb-0" style={{backgroundColor:"#ffffff"}}>

					
					<div className="modal-header py-0" style={{backgroundColor:"#ffffff"}}>
						<h5 className="modal-title py-0" style={{color:"#000000"}}> {customerName} </h5>
						<button
							type="button"
							className="btn btn-close"
							onClick={()=> setCustomerOrdersDisp(false)}
						></button> 
					</div>
		
					<div className = "modal-body py-0">
						
						<div className="row">
							<div className="col-12">
								<table className="table">
									<thead style={{
										border: "1px solid #000000",
										backgroundColor: "#8b6c5c",
										color:"#ffffff"}}>
										<tr > 
											<th scope="col" className="pl-4 " id="admin-table"> Order Id </th> 
											<th scope="col" className="pl-4 " id="admin-table"> Date </th> 
											<th scope="col" className="pl-4 " id="admin-table"> Sale/Return </th> 
											<th scope="col" className="pl-4 " id="admin-table"> Total (Rs.) </th> 
											<th scope="col" className="pl-4 " id="admin-table"> Pending Amount (Rs) </th> 
											<th scope="col" className="pl-4 " id="admin-table"> 
												<label className="mx-2"> Date  </label>
												<label className="mx-2">  |  </label> 
												<label className="mx-2"> Amount (Rs.) </label> 
												<label className="mx-2"> | </label>   
												<label className="mx-2"> Mode </label>
											</th> 
										</tr>														
									</thead>	
									<tbody style={{backgroundColor: "#ffffff", color:"#000000"}}>
										{customerOrdersTableData}		 		   				
									</tbody>	
								</table>
							</div>	

						</div>
						
					</div>

				</div>
			</div>
		</div>	
</Draggable> 




</>
	
)}

export default CustomerOrderDetailsDialog;