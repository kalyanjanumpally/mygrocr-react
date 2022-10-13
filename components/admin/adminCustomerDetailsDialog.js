import React from "react";
import Draggable from 'react-draggable';


const CustomerDetailsDialog = ({setCustomerDetailsDisp, customer}) => {	
	
	
	return(
		<>
		<Draggable>
			<div className="modal custom-modal d-block">
				<div className="modal-dialog">
					<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#FFFDD0", color:"#000000"}}>
						<div className="modal-header py-0" style={{backgroundColor:"#8b6c5c", color:"#ffffff"}}>
							<button
								type="button"
								className="btn btn-close "
								onClick={()=> setCustomerDetailsDisp(false)}
							></button>
								<h5 className="modal-title py-0"> {customer.fullName} </h5> 
								{/*	<select size={10} className="form-select mb-3" onClick={handleSelectedCustomer} onChange={handleSelectedCustomer}>
										<option value="Select Customer" disabled selected hidden>  </option>
										{dropdownSearchCustomersList} 
								</select>  */}
	
						</div>
						
						<table className="pb-0 mb-0" style={{color:"#000000", fontSize:"20px"}} >											
							<tbody>
								<tr>
									<td> Phone No: </td>
									<td> {customer.phone1}</td>
								</tr>
								<tr>
									<td> Additional Phone No: </td>
									<td> {customer.phone2}</td>
								</tr>
								<tr>
									<td> Email: </td>
									<td> {customer.email}</td>
								</tr>
								<tr>
									<td> Address: </td>
									<td> {customer.address}</td>
								</tr>	
								<tr>
									<td> Pin Code: </td>
									<td> {customer.postalCode}</td>
								</tr>	
								<tr>
									<td> City: </td>
									<td> {customer.city}</td>
								</tr>								
								<tr>
									<td> </td>
									<td> </td>
								</tr>
							  			
							</tbody>										
						</table>
						
					</div>
				</div>
			</div>	
		</Draggable>
		</>
		
)}


export default CustomerDetailsDialog;