import React from "react";
import Link from "next/link"
//import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//import { connect } from "react-redux";
//import { addCategoriesToStore, deleteCatFromStore } from "./../../redux/action/categories";
import * as APIs from "./../../util/springAPIs";


const ComponentManageSuppliers = () => {
	
	const [suppliers, setSuppliers] = useState(null);
	const [refresh, setRefresh] = useState(false);
 //   const router = useRouter();
	
	
	useEffect(() => {
	//If Categories data is not available in redux store, then only fetch data..	
		
//	const suppliersUrl = "http://localhost:8083/api/suppliers" 
	
	const suppliersUrl = APIs.suppliersUrl;
	
		const fetchData = async () => {
			try {
				const response = await fetch(suppliersUrl);
				const json = await response.json();
				setSuppliers(json);
				} 
			catch (error) {
				alert("From adminManageSuppliers: fetching suppliers, Server-side error. Please try later.")
			}			
		}			
		fetchData(); 			
		
	},[refresh]);
	
	const deleteSupplier = (e) => {
		
	//	const delSupplierUrl = "http://localhost:8083/api/suppliers/" + e; 
		
		const delSupplierUrl = APIs.delSupplierUrl + e;
		
		const delData = async () => {
            try {
                const response = await fetch(delSupplierUrl,{ method: 'DELETE' });
           //     const json = await response.json();
				
				if(!response.ok){
					alert("HTTP error. Please try later.")
				}
				else {			
					setRefresh(!refresh);	
				}
                
			} 
			catch (error) {
				alert("HTTP/network error. Please try later.")
			}			
		}			
		delData(); 
		
	}

	
	let suppliersData = [];
	
	if(suppliers != null && suppliers.length > 0) {

		for(let x in suppliers) {								
			suppliersData.push(<tr> <td> {suppliers[x].supplierId} </td> <td> {suppliers[x].supplierName} </td>
									<td> <div className="text-center"><a onClick={()=> deleteSupplier(suppliers[x].supplierId)}><img src="/assets/imgs/icons/file-x.svg"></img></a> </div> </td></tr>);   
		} 
	}	
	
return(
<>

	<div className="container">
		<div className ="row mt-60">
			<div className="col-md-1"> </div>
				<div className="col-md-6 ">

				<table mt-20>
				<thead>
					<tr> <th>Supplier Id</th> <th>Supplier Name</th> <th> Delete </th></tr>
				</thead>	
				<tbody>
					{suppliersData} 
				</tbody>	
				</table>
			</div>
		</div>
	</div>



</>		
)}





export default ComponentManageSuppliers;