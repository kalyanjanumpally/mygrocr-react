import React from "react";
import Draggable from 'react-draggable';
import { useEffect, useState } from "react";
import * as APIs from "./../../util/springAPIs";


const ProductInventoryDataDialog = ({setInventoryDialogDisp, productId}) => {
	
	const [inventoryData, setInventoryData] = useState([]);
	
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [searchBatchToggle, setSearchBatchToggle] = useState(false);
	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
		
	useEffect( ()=> {
		
		if(productId.toString().length>0) {
				
			const getProductInventoryData = async () => {
				try {
				//	const productInventoryUrl = "http://localhost:8083/api/product-inventory-data/" + productId; 

					const productInventoryUrl = APIs.productInventoryUrl + productId + "/" + itemsPerPage + "/" + startIndex; 				
					const response = await fetch(productInventoryUrl);					
					const json = await response.json();
					
					if(!response.ok){
						alert("HTTP error. Please try later.")
					}
					else {	
						//need code to refresh the page after pagination is done...............................................		
						console.log("json")
						console.log(json)
						setInventoryData(json.dtos);	

						if(startIndex == 0){
							setCount(json.countOfBatches);
						}						
					}               
				} 
				catch (error) {
					alert("HTTP/network error. Please try later.")
				}			
			}			
			getProductInventoryData(); 
			
			setInventoryDialogDisp(true);
		}
	},[productId, searchBatchToggle]);
	
	console.log(inventoryData)
	
	const batchesList = [];
	
	for(let x in inventoryData) {	
		batchesList.push(
			<tr>
				<td style={{textAlign:"center"}}> {inventoryData[x].batchNo.substring(8) + "-" + inventoryData[x].batchNo.substring(5,7) + "-" + inventoryData[x].batchNo.substring(0,4)} </td>
				<td style={{textAlign:"center"}}> {inventoryData[x].date.substring(8) + "-" + inventoryData[x].date.substring(5,7) + "-" + inventoryData[x].date.substring(0,4)} </td>
				<td style={{textAlign:"center"}}> 
				
				{ 
					inventoryData[x].transactionStatus == "stock-correction" ? "Stock Correction" :
					( inventoryData[x].transactionStatus == "stock-expiry" ? "Stock Expiry" : 
						(inventoryData[x].batchPurSaleBool ? "Sale" : "Purchase") 
					)
				} 
				
				</td>		
				<td style={{textAlign:"center"}}> {inventoryData[x].batchPurSaleBool ? inventoryData[x].quantity * (-1) : inventoryData[x].quantity} </td>					
			</tr>
		)	
	}
	
	const handlePreviousBatchesList = () => {
		setCurrentPage(currentPage - 1);
		setSearchBatchToggle(!searchBatchToggle);
	}
	
	const handleNextBatchesList = () => {
		setCurrentPage(currentPage + 1);
		setSearchBatchToggle(!searchBatchToggle);
	}

	
	return(
		<>
		<Draggable>
			<div className="modal custom-modal d-block" >
				<div className="modal-dialog" >
					<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#FFFDD0", color:"#000000"}}>
					
						<div className="modal-header py-0"  style={{backgroundColor:"#3BB77E", color:"#ffffff"}}>
							<h5 className="modal-title py-0"> {inventoryData[0]?.batchProductName} </h5>
							<button
								type="button"
								className="btn btn-close"
								onClick={()=> setInventoryDialogDisp(false)}
							></button> 
						</div>
					
							
						<div>		
									
							<table className="pb-0 mb-0"  >										
								<thead>
									<tr> 
										<th style={{textAlign:"center"}}> Batch No. </th> 
										<th style={{textAlign:"center"}}> Date </th>  	
										<th style={{textAlign:"center"}}> Purchase/ Sale </th> 
										<th style={{textAlign:"center"}}> Qty </th>  					 
									</tr>
								</thead>	
								<tbody>
								  {batchesList} 				
								</tbody>										
							</table>
						</div>
						<div classNamee="d-inline-flex">					
							{ startIndex != 0 &&	
							<button type="button" className="mt-20" onClick={handlePreviousBatchesList} style={{
																							height: "30px",
																							width: "90px",
																							background: "#168cee",
																							color:"#ffffff",
																							fontSize: "12px",
																							border: "none"
																						}}
							> Previous </button> }
							
							{ startIndex < (count - itemsPerPage) &&	
								<button type="button" className="ml-5 mt-20" onClick={handleNextBatchesList} style={{
																							height: "30px",
																							width: "70px",
																							background: "#168cee",
																							color:"#ffffff",
																							fontSize: "12px",
																							border: "none"
																						}}
							> Next </button> }
						</div>	
						
					</div>
				</div>
			</div>	
		</Draggable>
		</>
		
)}


export default ProductInventoryDataDialog;