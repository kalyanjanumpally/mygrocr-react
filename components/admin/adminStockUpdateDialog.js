import React from "react";
import Draggable from 'react-draggable';
import { useEffect, useState, useRef } from "react";
import * as APIs from "./../../util/springAPIs";


const StockUpdateDialog = ({setStockUpdateDialogDisp, productInfo, handleStockUpdate}) => {
	
	const [stockCorrection, setStockCorrection] = useState([]);
	const [stockExpiry, setStockExpiry] = useState([]);
	const [stockUpdateData, setStockUpdateData] = useState([]);
	
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	useEffect(() => {
		
		if(productInfo.productId.toString().length > 0){
			const getStockUpdateData = async () => {
				try {
				//	const productPurchaseBatchesUrl = "http://localhost:8083/api/product-batches-quantity-data/" + productId; 
					
					const productPurchaseBatchesUrl = APIs.productPurchaseBatchesUrl + productInfo.productId; 
					
					const response = await fetch(productPurchaseBatchesUrl);
					const json = await response.json();
					
					if(!response.ok){
						alert("HTTP error. Please try later.")
					}
					else {	
						//need code to refresh the page after pagination is done...............................................	
						setStockUpdateData(json);					
					}               
				} 
				catch (error) {
					alert("HTTP/network error. Please try later.")
				}			
			}			
			getStockUpdateData(); 
		}	
	},[productInfo.productId])
	
	
	const handleStockCorrection = (e,x) => {
		const tempStockCorrection = JSON.parse(JSON.stringify(stockCorrection));
		tempStockCorrection[x] = e.target.value;		
		setStockCorrection(tempStockCorrection);
	}
	
	const handleStockExpiry = (e,x) => {		
		const tempStockExpiry = JSON.parse(JSON.stringify(stockExpiry));
		tempStockExpiry[x] = e.target.value;		
		setStockExpiry(tempStockExpiry);		
	}
	
	const resetForm = () => {
		const tempStockCorrection = [];
		for(let i in stockCorrection){
			tempStockCorrection[i] = "";
		}
		setStockCorrection(tempStockCorrection);
		
		const tempStockExpiry = [];
		for(let i in stockExpiry){
			tempStockExpiry[i] = "";
		}
		setStockExpiry(tempStockExpiry);
	}
	
	const handleConfirm = () => {
		
		const confirmStockUpdate = confirm("Are you sure you want to upate the stock?");		
		if( confirmStockUpdate == true) {

			const stockUpdateEntries = [];

			for(let x in stockUpdateData) {	
				const tempStockUpdateEntries = {};	
				
				if(stockExpiry[x] != null){
					tempStockUpdateEntries.quantity = stockExpiry[x];
					tempStockUpdateEntries.batchNo = stockUpdateData[x].batchNo;
					tempStockUpdateEntries.batchProductId = productInfo.productId;	
					tempStockUpdateEntries.transactionStatus = "stock-expiry";
					
					stockUpdateEntries.push(tempStockUpdateEntries);	
				}
				else if( stockCorrection[x] != null){

					tempStockUpdateEntries.quantity = stockCorrection[x];
					tempStockUpdateEntries.batchNo = stockUpdateData[x].batchNo;
					tempStockUpdateEntries.batchProductId = productInfo.productId;	
					tempStockUpdateEntries.transactionStatus = "stock-correction";
					
					stockUpdateEntries.push(tempStockUpdateEntries);
				}
			}
			
			const updateStock = async () => {
				
			//	const stockCorrectionUrl = "http://localhost:8083/api/update-stock" 
				
				const stockCorrectionUrl = APIs.stockCorrectionUrl
				
				const requestOptionsStockCorrection = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(stockUpdateEntries)
				};
				
				try {
					const response = await fetch(stockCorrectionUrl, requestOptionsStockCorrection);
				//	const json = await response.json();
					
					if(!response.ok){
						alert("HTTP Error: Stock Correction Failed.")
					}
					else {
						//reset entries and refresh the page
						resetForm();
						handleStockUpdate(productInfo.productId, productInfo.productName, productInfo.brandName);	
					}					
				} 
				catch (error) {
					alert("From adminViewProducts: Cannot fetch products. Server-side error. Please try later.")
				}			
			}			
			updateStock();			
		}		
	}

	const stockUpdateList = [];

	const date = new Date();
	
	 for(let x in stockUpdateData) {

		const expiryDate = Date.parse(stockUpdateData[x].expiryDate);		 
	 
		stockUpdateList.push(
		 	<tr className= {(expiryDate - date)<0 ? "modal-stock-update-expired" : "modal-stock-update"}>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {stockUpdateData[x].batchNo.substring(8) + "-" + stockUpdateData[x].batchNo.substring(5,7) + "-" + stockUpdateData[x].batchNo.substring(0,4)} </td>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {stockUpdateData[x].expiryDate.substring(8) + "-" + stockUpdateData[x].expiryDate.substring(5,7) + "-" + stockUpdateData[x].expiryDate.substring(0,4)} </td>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}> {stockUpdateData[x].quantity} </td>	
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}>
					<input type="text" className=" px-0 " value={stockCorrection[x]} style={{width:"70px", height:"30px", borderRadius:"0px", backgroundColor:"#ffffff", textAlign:"center", border:"1px solid #2b2d2f" }} onChange={(e) => handleStockCorrection(e,x)}  /> 
				</td>
				<td style={{textAlign:"center", border:"1px solid #A9A9A9"}}>
					<input type="text" className=" px-0 " value={stockExpiry[x]} style={{width:"70px", height:"30px", borderRadius:"0px", backgroundColor:"#ffffff", textAlign:"center", border:"1px solid #2b2d2f"}} onChange={(e) => handleStockExpiry(e,x)}  /> 
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
				<div className="modal-dialog" id="modal-stock-update" >
					<div className="modal-content pt-0 pb-1" style={{backgroundColor:"#FFFDD0", color:"#000000"}}>
					
						<div className="modal-header py-0"  style={{backgroundColor:"#8b6c5c", color:"#ffffff"}}>
							<h5 className="modal-title py-0"> { productInfo?.productName } --- { productInfo?.brandName } </h5>
							<button
								type="button"
								className="btn btn-close"
								onClick={()=> setStockUpdateDialogDisp(false)}
							></button> 
						</div>
					
							
						<div>						
							<table className="pb-0 mb-0"  >										
								<thead>
									<tr> 
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Batch No. </th> 
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Expiry Date </th>  	
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Qty </th> 
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Correction </th>
										<th style={{textAlign:"center", border:"1px solid #A9A9A9"}}> Expiry </th>	
									</tr>
								</thead>	
								<tbody>
								  {stockUpdateList} 				
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
						
						<div className="d-flex justify-content-end"  style={{backgroundColor:"#FFFDD0", height:"30px"}}>	
							<button type="button" onClick={handleConfirm} className="admin-stock-update-button my-1 mx-1" style={{height:"25px", fontSize:"15px", backgroundColor:"#8b6c5c", color:"#ffffff", fontWeight:"500"}}> Confirm </button> 
						</div> 						
						
					</div>
				</div>		
				
			</div>

			
		</Draggable>
		</>
		
)}


export default StockUpdateDialog;