import React from "react";
import Draggable from 'react-draggable';
import { useEffect, useState, useRef } from "react";
import * as APIs from "./../../util/springAPIs";


const BatchesDisplayDialog = ({setBatchesDisplayDialogDisp, productInfo}) => {
	
	const [batchDisplay, setBatchDisplay] = useState([]);
	const [batchesDisplayData, setBatchesDisplayData] = useState([]);
	
	//pagination currently not used...
	const [itemsPerPage, setItemsPerPage] = useState(2);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [searchBatchToggle, setSearchBatchToggle] = useState(false);
	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
			
	useEffect(() => {	
		const tempBatchDisplay = [];			
		for(let x in batchesDisplayData) {
			tempBatchDisplay[x] = batchesDisplayData[x].display;
		}		
		setBatchDisplay(tempBatchDisplay);
	},[batchesDisplayData])
	
	
	useEffect(() => {
		
		if(productInfo.productId.toString().length>0){
			const getBatchesData = async () => {
				try {
				//	const batchesDisplayUrl = "http://localhost:8083/api/product-batches-quantity-data/" + productId; 
					
					const batchesDisplayUrl = APIs.batchesDisplayUrl + productInfo.productId;
					
					const response = await fetch(batchesDisplayUrl);
					const json = await response.json();
					
					if(!response.ok){
						alert("HTTP error. Please try later.")
					}
					else {	
						//need code to refresh the page after pagination is done...............................................		
						setBatchesDisplayData(json);	
					}               
				} 
				catch (error) {
					alert("HTTP/network error. Please try later.")
				}			
			}			
			getBatchesData(); 
		}
	},[productInfo.productId, searchBatchToggle])

	
	
	const handleBatchDisplayChange = (batchNo, productId, quantity, x) => {
		
		if(quantity !=0 ) {
			alert("Batch stock should be zero.");
		}
		else {	
			const confirmAction = confirm("Are you sure that you want to update the batch display?");
			
			if(confirmAction == true) {	
			//	const batchDisplayChangeUrl = "http://localhost:8083/api/batch-display-change/" + batchNo + "/" + productId;
				
				const batchDisplayChangeUrl = APIs.batchDisplayChangeUrl + batchNo + "/" + productId;
				
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
				};
				
				const batchDisplayChange = async () => {
					try {
						const response = await fetch(batchDisplayChangeUrl, requestOptions);
					//	const json = await response.json();			
						
						if(!response.ok){
							alert("HTTP Error: Batch Display Update failed.")
						}
						else{
							const tempBatchDisp = JSON.parse(JSON.stringify(batchDisplay));
							tempBatchDisp[x] = !tempBatchDisp[x];
							setBatchDisplay(tempBatchDisp);
						}
					}	
					catch (error) {
						alert("HTTP/ Network Error: Batch Display Update failed.")
					}			
				}			
				batchDisplayChange(); 
			}
		}
	}
	
	const batchesDisplayList = [];
	const date = new Date();
	
	 for(let x in batchesDisplayData) {	
	 
		const expiryDate = Date.parse(batchesDisplayData[x].expiryDate);
	 
		batchesDisplayList.push(
		 	<tr className= {(expiryDate - date)<0 ? "modal-stock-update-expired" : "modal-stock-update"}>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {batchesDisplayData[x].batchNo.substring(8) + "-" + batchesDisplayData[x].batchNo.substring(5,7) + "-" + batchesDisplayData[x].batchNo.substring(0,4)} </td>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {batchesDisplayData[x].expiryDate.substring(8) + "-" + batchesDisplayData[x].expiryDate.substring(5,7) + "-" + batchesDisplayData[x].expiryDate.substring(0,4)} </td>	
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {batchesDisplayData[x].quantity} </td>	
				<td className="" style={{textAlign:"center", border:"1px solid #A9A9A9"}}>
					<input type="checkbox" style={{width:"20px", height:"20px"}} checked={batchDisplay[x]} onChange={() => handleBatchDisplayChange(batchesDisplayData[x].batchNo, productInfo.productId, batchesDisplayData[x].quantity , x)}/>
				</td>
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
				<div className="modal-dialog" id="modal-purchase_batches">
					<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#FFFDD0", color:"#000000"}}>
					
						<div className="modal-header py-0"  style={{backgroundColor:"#8b6c5c", color:"#ffffff"}}>
							<h5 className="modal-title py-0"> { productInfo?.productName } --- { productInfo?.brandName } </h5>
							<button
								type="button"
								className="btn btn-close"
								onClick={()=> setBatchesDisplayDialogDisp(false)}
							></button> 
						</div>
					
							
						<div>											
							<table className="pb-0 mb-0"  >										
								<thead>
									<tr> 
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Batch No. </th> 
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Expiry Date </th>  	
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Qty </th> 
										<th> Display </th>		
									</tr>
								</thead>	
								<tbody>
								  {batchesDisplayList} 				
								</tbody>										
							</table>
						</div>	
						{/*
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
						*/}
						
					</div>
				</div>
			</div>	
		</Draggable>
		</>
		
)}


export default BatchesDisplayDialog;