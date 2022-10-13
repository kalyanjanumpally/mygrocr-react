import React from "react";
import { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import * as APIs from "./../../util/springAPIs";


const ProductBatchesDialog = ({setProdBatchesDialogDisp, selKey, setSelectedDTO, setSelectedBatch, selectedBatchToggle, setSelectedBatchToggle, searchProductResult, setSearchProductResult  }) => {
	
	const [batchDisplay, setBatchDisplay] = useState([]);
	
	useEffect(() => {			
		const tempBatchDisplay = [];		
		for(let x in searchProductResult[selKey].batchesData) {				
			tempBatchDisplay.push(searchProductResult[selKey].batchesData[x].display)
		}		
		setBatchDisplay(tempBatchDisplay);		
	},[searchProductResult[selKey]])

	const batchesList = [];
	const batchesDisplayList = [];
	
	const handleSelectedBatch = (selectedBatchNo) => {
		
		setSelectedBatch(selectedBatchNo);
		setSelectedBatchToggle(!selectedBatchToggle);
		setProdBatchesDialogDisp(false);
	}
	
	const handleBatchDisplayChange = (batchNo, quantity, productId, x) => {
		
		if(quantity != 0) {
			alert("Batch stock should be zero.");
		}
		else {

			const confirmAction = confirm("Are you sure that you want to remove the batch?");
			
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
							const searchProductResultTemp = JSON.parse(JSON.stringify(searchProductResult));
							
							searchProductResultTemp[selKey].batchesData[x].display = !searchProductResultTemp[selKey].batchesData[x].display;
							setSearchProductResult(searchProductResultTemp);				
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
	
	
	if(searchProductResult[selKey].batchesData.length > 0) {
		
		for( let x in searchProductResult[selKey].batchesData) {
			
			if(searchProductResult[selKey].batchesData[x].display != false) {
			
				const expiryDate = Date.parse(searchProductResult[selKey].batchesData[x].expiryDate);
				const date = new Date();
				
				let ddBatchNo = searchProductResult[selKey].batchesData[x].batchNo.substring(8);
				let mmBatchNo = searchProductResult[selKey].batchesData[x].batchNo.substring(5,7);
				let yyyyBatchNo = searchProductResult[selKey].batchesData[x].batchNo.substring(0,4);
				
				let ddExpiryDt = searchProductResult[selKey].batchesData[x].expiryDate.substring(8);
				let mmExpiryDt = searchProductResult[selKey].batchesData[x].expiryDate.substring(5,7);
				let yyyyExpiryDt = searchProductResult[selKey].batchesData[x].expiryDate.substring(0,4);
				
				batchesList.push(
				<tr className= {(expiryDate - date)<0 ? "product-batch-table-expired product-batch-table" : "product-batch-table"} onClick={() => handleSelectedBatch(searchProductResult[selKey].batchesData[x].batchNo)}>											
												
												<td>     {ddBatchNo + '-' + mmBatchNo + '-' + yyyyBatchNo} </td>
												<td>	 {searchProductResult[selKey].batchesData[x].quantity} </td>  												  
												<td>	 {searchProductResult[selKey].batchesData[x].mrp} </td>
												<td>	 {ddExpiryDt + '-' + mmExpiryDt + '-' + yyyyExpiryDt} </td>	
											</tr>		
				);
				
				batchesDisplayList.push(
				<tr>														
					<td className="d-flex justify-content-center pt-3" >
						<input type="checkbox" style={{width:"20px", height:"20px"}} checked={batchDisplay[x]} onChange={() => handleBatchDisplayChange(searchProductResult[selKey].batchesData[x].batchNo, searchProductResult[selKey].batchesData[x].quantity, searchProductResult[selKey].product.productId ,x)}/>
					</td>
				</tr>
				)
			}	
		}	
	}
		
	return(
		<>
		<Draggable>
			<div className="modal custom-modal d-block" >
				<div className="modal-dialog" >
					<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#f5fcff", color:"#000000"}}>
						<button
							type="button"
							className="btn-close"
							onClick={()=> setProdBatchesDialogDisp(false)}
						></button>
							
							<div className = "row" style={{maxHeight:"300px", overflowY: "auto", scrollbarWidth: "auto"}}>		
								
								<p className="py-1 pl-20" style={{color:"#000000", fontWeight:"700"}}> {searchProductResult[selKey].product.productName} </p> 
								
								<div className="col-2">			
									<table >										
										<thead>
											<tr> 
												<th> Display </th>
											</tr>
										</thead>	
										<tbody>
										  {batchesDisplayList} 				
										</tbody>										
									</table>
								</div>
								
								<div className="col-10">
									<table >										
										<thead>
											<tr> 
												<th style={{minWidth:"125px"}}> Batch No. </th>
												<th> Qty </th> 
												<th> MRP </th>
												<th style={{minWidth:"125px"}}> Expiry </th> 
											</tr>
										</thead>	
										<tbody>
										  {batchesList} 				
										</tbody>										
									</table>
								</div>
							</div>					
						
					</div>
				</div>
			</div>	
		</Draggable>
		</>
		
)}


export default ProductBatchesDialog;