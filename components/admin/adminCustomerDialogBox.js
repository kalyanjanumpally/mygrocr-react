import React from "react";
import Draggable from 'react-draggable';
import Pagination from "./adminPagination";


const CustomerDialogBox = ({setCustSearchDisp, custSearchDisp, searchCustomerResult, setSearchCustomer, setSelectedCustomer,
							paginationGroupCustomer, currentPageCustomer, pagesCustomer, nextCustomer, prevCustomer, handleActiveCustomer, selectChangeCustomer }) => {	

	const dropdownSearchCustomersList = [];
	 if(searchCustomerResult.length > 0) {
		for(let x in searchCustomerResult) {	
			dropdownSearchCustomersList.push(<option className="admin-options"  value={searchCustomerResult[x].customerId} > {searchCustomerResult[x].fullName} </option>);
		}
	} 
	
	const handleSelectedCustomer = (e) => {		
			
		for( let x in searchCustomerResult) {			
			if(searchCustomerResult[x].customerId == e.target.value) {
				setSearchCustomer(searchCustomerResult[x].fullName);
				setSelectedCustomer(searchCustomerResult[x]);
			}
		}	
		setCustSearchDisp(false);		
	}
	
	
	return(
		<>
		<Draggable>
			<div className="modal custom-modal d-block">
				<div className="modal-dialog">
					<div className="modal-content pt-0 pb-1">
						<button
							type="button"
							className="btn btn-close "
							style={{height:"10px", width:"10px", marginTop:"-10px"}}
							onClick={()=> setCustSearchDisp(false)}
						></button>
							
						<div className = "row">		
							
							<p> Select Customer </p> 
							<select size={10} className="form-select mb-3" onClick={handleSelectedCustomer} onChange={handleSelectedCustomer}>
									<option value="Select Customer" disabled selected hidden>  </option>
									{dropdownSearchCustomersList} 
							</select> 
						</div>					
							
						<nav aria-label="Page navigation example">				
							<Pagination
							paginationGroup={
								paginationGroupCustomer
							}
							currentPage={currentPageCustomer}
							pages={pagesCustomer}
							next={nextCustomer}
							prev={prevCustomer}
							handleActive={handleActiveCustomer}
							selectChange={selectChangeCustomer}
							/>  
						</nav>		
		
					</div>
				</div>
			</div>	
		</Draggable>
		</>
		
)}


export default CustomerDialogBox;