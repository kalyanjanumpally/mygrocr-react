import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { findCustomerIndexById, findCategoryIndexById, deleteCategory } from "./../../util/util"
import { useRouter } from 'next/router';
import Pagination from "./adminPagination";
import CustomerDetailsDialog from "./adminCustomerDetailsDialog";
import * as APIs from "./../../util/springAPIs";

const ComponentManageCustomers = () => {

	const [customers, setCustomers] = useState([]);
	const [customerSearchBool, setCustomerSearchBool] = useState(false);
	const [customerSearchToggle, setCustomerSearchToggle] = useState(false);
	const [allCustomersBool, setAllCustomersBool] = useState(false);
	const [customerDeleteBool, setCustomerDeleteBool] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [customerDetailsDisp, setCustomerDetailsDisp] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState("");
	
	const [search, setSearch] = useState("");
	
    //Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(30);
//	const [newItemsPerPage, setNewItemsPerPage] = useState(3);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [pagination, setPagination] = useState([]);
	
	const showPagination = 10;	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
	
//	let getPaginatedCustomers = [];
	let paginationGroup = [];
	
	const router = useRouter();
	
	const initiatePagination = (countOfCustomers) => {
				
		// set pagination
		let arr = new Array(Math.ceil(countOfCustomers / itemsPerPage))
			.fill()
			.map((_, idx) => idx + 1);  //   the underscore is just a placeholder for value which is not used in the function, you can put any name there.

		setPagination(arr);
		setPages(Math.ceil(countOfCustomers/ itemsPerPage));	
	} 

	useEffect(() => {	
	//	const getCustomersUrl = "http://localhost:8083/api/get-customers/" + itemsPerPage + "/" + startIndex;
		
		const getCustomersUrl = APIs.getCustomersUrl + itemsPerPage + "/" + startIndex;
		
		const fetchCustomers = async () => {
			try {
				const response = await fetch(getCustomersUrl);
				const json = await response.json();
				
				console.log(json);
				
				setCustomers(json.customers)
				if(startIndex == 0){
					initiatePagination(json.countOfCustomers);
				}		
			} 
			catch (error) {
				alert("From adminViewCustomers: Cannot fetch customers. Server-side error. Please try later.")
			}			
		}			
		fetchCustomers(); 							
	},[refresh, allCustomersBool]);	
	
	
	useEffect(() => {
		
		if(search.length > 0) {	

			setCustomerSearchBool(true);
			
		//	const searchCustomerUrl = "http://localhost:8083/api/search-customer/" + search + "/" + itemsPerPage + "/" + startIndex;
		
			const searchCustomerUrl = APIs.searchCustomerUrl + search + "/" + itemsPerPage + "/" + startIndex;
			
			
			const fetchCustomerSearchData = async () => {
				try {
					const response = await fetch(searchCustomerUrl);
					let json = await response.json();					
					setCustomers(json.customers);
					if(startIndex == 0){
						initiatePagination(json.countOfCustomers);
					}						
					
				} 
				catch (error) {
					alert("From adminCustomer: fetching customers data, Server-side error. Please try later.")
				}			
			}			
			fetchCustomerSearchData();				
		}
		else if (search.length == 0) {
			setCustomerSearchBool(false);
			setAllCustomersBool(!allCustomersBool);
		} 
	},[customerSearchToggle])
	
	const handleSearchFirstPage = () => {
		setCurrentPage(1);
		setCustomerSearchToggle(!customerSearchToggle)		
	}

	
	const handleDeleteCustomerBool = (key) => {
		
		const tempCustomerDeleteBool = JSON.parse(JSON.stringify(customerDeleteBool));		
		tempCustomerDeleteBool[key] = !tempCustomerDeleteBool[key]		
		setCustomerDeleteBool(tempCustomerDeleteBool);		
	}
	
	const handleDeleteCustomer = () => {
		
		const deleteCustomerConfirmation = confirm("Are you sure to delete this customer? This action is irreversible.");
		
		if(deleteCustomerConfirmation == true) {
			
			for(let x in customerDeleteBool) {
				
				if(customerDeleteBool[x] == true) {
					
					let customerId = customers[x].customerId;
			
				//	const delCustomerUrl = "http://localhost:8083/api/delete-customer/"; 
					
					const delCustomerUrl = APIs.delCustomerUrl;
					
					const requestOptionsDelete = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(customerId)
					}
					
					
					const deleteCustomer = async () => {
						try {
							const response = await fetch(delCustomerUrl,requestOptionsDelete);
					        const json = await response.json();
							
							if(!response.ok){
								alert("HTTP error. Please try later.")
								setRefresh(!refresh);
							}
							else {	
								//need code to refresh the page after pagination is done...............................................	
								
								if(json == false){
									alert("Cannot delete this customer as transactions with the customer exist.");
								}
								else{
									alert("Customer Deleted.")
									setCustomerDeleteBool([])
									setRefresh(!refresh);
								}
							}            
						} 
						catch (error) {
							alert("HTTP/network error. Please try later.")
						}			
					}			
					deleteCustomer(); 
				}	
			}		
		}	
	}
	
	// Pagination Code Begins...................................................................	

//	getPaginatedCustomers = customers.slice(startIndex, endIndex);
//	getPaginatedCustomers = customers;
	paginationGroup = pagination.slice(start, end);	

    const next = () => {
        setCurrentPage((page) => page + 1);
		if(customerSearchBool == false ) {
			setAllCustomersBool(!allCustomersBool);
		}
		else{
			setCustomerSearchToggle(!customerSearchToggle);
		}
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
		if(customerSearchBool == false ) {
			setAllCustomersBool(!allCustomersBool);
		}
		else{
			setCustomerSearchToggle(!customerSearchToggle);
		}
    };

    const handleActive = (item) => {
        setCurrentPage(item);
		if(customerSearchBool == false ) {
			setAllCustomersBool(!allCustomersBool);
		}
		else{
			setCustomerSearchToggle(!customerSearchToggle);
		}		
    };

    const selectChange = (newItemsPerPage) => {
		
        setItemsPerPage(Number(newItemsPerPage));
        setCurrentPage(1);
		setAllCustomersBool(!allCustomersBool);
     //   setPages(Math.ceil(customers.length / Number(newItemsPerPage))); 
    };  
	
	// Pagination Code Ends...................................................................
	
	
	
	const customersArray = [];	
	for(let x in customers) {	
		customersArray.push(customers[x])
	}
	
	const handleCustomerDetails = (customer) => {		
		setCustomerDetailsDisp(true);
		setSelectedCustomer(customer);
	}
	let customersTableData = [];
	
	if( customersArray.length >0 ) {	
		
		customersTableData = customersArray.map((customer, key) => (	

		  <tr>
		  <td className="d-flex justify-content-center" >
		      <input className="" type="checkbox" style={{width:"20px", height:"20px"}} checked={customerDeleteBool[key]} onChange={() => handleDeleteCustomerBool(key)}/> 
		  </td>
		  
		  <td style={{textAlign:"center"}}> { customer.customerId } </td>
			  
		  <td style={{textAlign:"center"}}> { customer.fullName } </td>
		  <td style={{textAlign:"center"}}> { customer.phoneNo1 } </td>
		  <td style={{textAlign:"center"}}> { customer.email } </td>
		  <td style={{textAlign:"center"}}> { customer.dateRegistered?.substring(8) + "-" + customer.dateRegistered?.substring(5,7) + "-" + customer.dateRegistered?.substring(0,4) } </td>
		  <td style={{textAlign:"center"}}> 
			<a onClick={()=> handleCustomerDetails(customer)} 
			dataToggle="tooltip" title="Batches"><img style={{width: "20px"}} src="/assets/imgs/icons/batches.svg"></img></a>  
		  </td>
		  <td>  </td>
		  </tr>	 
	 ))
	}


return(
<>

	<div className="container">
	
		<div className="row mt-10">
			<div className="row ml-10 mt-10 mb-10">
				<label style={{fontSize:"30px"}}> Customers </label>
			</div>	
			<div className="col-12 d-flex justify-content-between align-items-end">
				
				<input type="text" className="input-admin  mx-2" style={{height:"30px", width:"150px", borderRadius:"0px", fontSize:"12px"}} value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)} 
						onKeyDown={(e)=>{
						if(e.key === "Enter") handleSearchFirstPage();
				}} />
				
				<button type="button" style={{
												width:"100px",
												height:"30px",
												borderRadius:"none",
												backgroundColor:"#5E72E3",
												color:"#ffffff",
												border:"none",
												fontWeight:"500"	
				}} onClick={handleDeleteCustomer} > Delete </button>
			
			</div>
		</div>
		
		<hr className="my-1"/>
	
		<div className ="row mt-10">
			<div className="col-md-12 ">

				<table className="table" >
				<thead style={{
						border: "1px solid #000000",	
						position: "sticky",
						top: 0,																	
						right: 0,
						backgroundColor: "#5E72E3",
						color:"#ffffff",
						textAlign:"center"}}>
					<tr> 
						<th> Delete</th>
						<th> Id</th> 
						<th> Customer Name</th> 
						<th> Phone No. </th> 
						<th> E-mail</th>
						<th> Date Added </th>
						<th> Details </th>
						<th> Orders </th>
					</tr>
				</thead>	
				<tbody>
				  {customersTableData}  				
				</tbody>	
				</table>
			</div>
		</div>
		
		<div>
				<nav aria-label="Page navigation example">
			
					<Pagination
					paginationGroup={
						paginationGroup
					}
					currentPage={currentPage}
					pages={pages}
					next={next}
					prev={prev}
					handleActive={handleActive}
					selectChange={selectChange}
					/>  
		</nav>		
		</div>
		
	</div>	

	{ customerDetailsDisp && <CustomerDetailsDialog  setCustomerDetailsDisp={setCustomerDetailsDisp}  customer={selectedCustomer} /> }

</>	
	
)}

export default ComponentManageCustomers;