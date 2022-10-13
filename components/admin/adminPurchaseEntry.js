import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AdminButtonProduct from "./adminButtonProduct";
import * as APIs from "./../../util/springAPIs";

const ComponentPurchaseEntry = () => {
	
	const [suppliers, setSuppliers] = useState([]);
	const [supplierId, setSupplierId] = useState("");
	const [invoiceDate, setInvoiceDate] = useState("");
	const [searchProduct, setSearchProduct] = useState("");
	const [searchProductResult, setSearchProductResult] = useState("");
	const [searchProductToggle, setSearchProductToggle] = useState(false);
	const [selKey, setSelKey] = useState("");
	const [invoiceProductsList, setInvoiceProductsList] = useState([]);	
	const [batch, setBatch] = useState([]);
	const [quantity, setQuantity] = useState([]);
	const [purchasePrice, setPurchasePrice] = useState([]);
	const [mrp, setMrp] = useState([]);
	const [expiryDate, setExpiryDate] = useState([]);
	const [checkInclGST, setCheckInclGST] = useState([]);
	const [finalTotal, setFinalTotal] = useState(0);
	
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);

	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	
	const emptyForm = () => {
		
		console.log("Reaching 1")
		setInvoiceDate("");
		setSupplierId("");
		setSearchProduct("")
		setFinalTotal(0)
		
		const tempInvoiceProductsList = [];		
		for( let x in invoiceProductsList ) {			
			tempInvoiceProductsList[x]= "";			
		}
		setInvoiceProductsList(tempInvoiceProductsList);
		
		const tempBatch = [];		
		for( let x in batch ) {			
			tempBatch[x]= "";			
		}
		setBatch(tempBatch);
		
		const tempQuantity = [];		
		for( let x in quantity ) {			
			tempQuantity[x]= "";			
		}
		setQuantity(tempQuantity);
		
		const tempPurchasePrice = [];		
		for( let x in purchasePrice ) {			
			tempPurchasePrice[x]= "";			
		}
		setPurchasePrice(tempPurchasePrice);
		
		const tempMrp = [];		
		for( let x in mrp ) {			
			tempMrp[x]= "";			
		}
		setMrp(tempMrp);
		
		const tempExpiryDate = [];		
		for( let x in expiryDate ) {			
			tempExpiryDate[x]= "";			
		}
		setExpiryDate(tempExpiryDate);
		
		const tempCheckInclGST = [];		
		for( let x in checkInclGST ) {			
			tempCheckInclGST[x]= "";			
		}
		setCheckInclGST(tempCheckInclGST);		
		
	}
	
	
	useEffect(() => {	
	//	const suppliersUrl = "http://localhost:8083/api/suppliers" 	

		const suppliersUrl = APIs.suppliersUrl;
		
		const fetchSuppliersData = async () => {
			try {
				const response = await fetch(suppliersUrl);
				const json = await response.json();
				setSuppliers(json);
				} 
			catch (error) {
				alert("From adminAddSupplier: fetching suppliers, Server-side error. Please try later.")
			}			
		}			
		fetchSuppliersData(); 	
	},[])
	
	
	useEffect(() => {	

		const multiplyQuantityPriceArray = quantity.map((qty, key)=>{			
			if(qty && purchasePrice[key]) {
				return(qty * purchasePrice[key])
			}
			else {
				return 0;
			}
		})
		
		const sum = 0;
		for (let x in multiplyQuantityPriceArray) {
			sum = sum + multiplyQuantityPriceArray[x];
		}
		
		setFinalTotal(sum);
		
	},[quantity, purchasePrice])
	
		
	const handleSearchNameChange = (e) => {
		setSearchProduct(e.target.value);
	}
	
	useEffect(() => {			
		if(searchProduct.length > 0) {
		//	const searchProductUrl = "http://localhost:8083/api/search-products-and-batches/" + searchProduct + "/" + itemsPerPage + "/" + startIndex; 
			
			const searchProductUrl = APIs.searchProductUrl + searchProduct + "/" + itemsPerPage + "/" + startIndex; 
			
			const searchProd = async () => {
				try {
						const response = await fetch(searchProductUrl);
						const json = await response.json();

						if(!response.ok) {
							alert("HTTP Error. Please try later.");
						}
						else
							setSearchProductResult(json.dtos);
							if(startIndex ==0) {
								setCount(json.countOfProducts);
							}						
				} 
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}			
			}			
			searchProd();	
		}		
	},[searchProductToggle]);
	
	const handleSelectedProduct = (selectedKey) => {
			
			setSelKey(selectedKey);							
			let checkRepeatProduct = 0;		
			
			for(let x in invoiceProductsList) {
				if(invoiceProductsList[x].productId == searchProductResult[selectedKey].product.productId) {
					checkRepeatProduct = 1;
				}	
			}
			
			if(checkRepeatProduct == 0) {

				const invoiceEntry = {};				
				invoiceEntry.productId = searchProductResult[selectedKey].product.productId;
				invoiceEntry.productName = searchProductResult[selectedKey].product.productName;	
				invoiceEntry.productBrand = searchProductResult[selectedKey].product.brand.brandName;
				invoiceEntry.productSku = searchProductResult[selectedKey].product.sku;				
				invoiceEntry.gst = searchProductResult[selectedKey].product.gst;				
				
				const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
				tempInvoiceList.push(invoiceEntry);
				setInvoiceProductsList(tempInvoiceList);
			}
	}
		
	const buttonsSearchProductsList = [];
	if(searchProductResult.length > 0) {
		
		for(let x in searchProductResult) {				
			buttonsSearchProductsList.push(<AdminButtonProduct dto={searchProductResult[x]} selectedKey={x}   handleSelectedProduct={handleSelectedProduct} />);
		}			
	}
	
	const handleBatchChange = (e, key) => {
		const tempBatch = JSON.parse(JSON.stringify(batch));
		tempBatch[key] = e.target.value;
		setBatch(tempBatch);
	}
	
	const handleQuantityChange = (e, key) => {
		const tempQuantity = JSON.parse(JSON.stringify(quantity));
		tempQuantity[key] = e.target.value;
		setQuantity(tempQuantity);
	}
	
	const handlePurchasePriceChange = (e, key) => {
		const tempPurchasePrice = JSON.parse(JSON.stringify(purchasePrice));
		tempPurchasePrice[key] = e.target.value;
		setPurchasePrice(tempPurchasePrice);
	}
	
	const handleInclGSTChange = (e, key) => {
		const tempInclGST = JSON.parse(JSON.stringify(checkInclGST));
		tempInclGST[key] = !tempInclGST[key];
		setCheckInclGST(tempInclGST);			
	}	
	
	const handleMrpChange = (e, key) => {
		const tempMrp = JSON.parse(JSON.stringify(mrp));
		tempMrp[key] = e.target.value;
		setMrp(tempMrp);
	}
	
	const handleExpiryDateChange = (e, key) => {
		const tempExpiryDate = JSON.parse(JSON.stringify(expiryDate));
		tempExpiryDate[key] = e.target.value;
		setExpiryDate(tempExpiryDate);
	}
	
	const deleteInvoiceEntry = (key) => {
		
		const tempInvoiceProductsList = JSON.parse(JSON.stringify(invoiceProductsList));
		const updatedInvoiceProductsList = tempInvoiceProductsList.filter((product, keyIter) => keyIter != key)
		setInvoiceProductsList(updatedInvoiceProductsList); 
		
		const tempBatch = JSON.parse(JSON.stringify(batch));
		const updatedBatch = tempBatch.filter((batch, keyIter) => keyIter != key)
		setBatch(updatedBatch); 
		
		const tempQuantity = JSON.parse(JSON.stringify(quantity));
		const updatedQuantity = tempQuantity.filter((quantity, keyIter) => keyIter != key)
		setQuantity(updatedQuantity); 			
		
		const tempPurchasePrice = JSON.parse(JSON.stringify(purchasePrice));
		const updatedPurchasePrice = tempPurchasePrice.filter((pp, keyIter) => keyIter != key)
		setPurchasePrice(updatedPurchasePrice); 			
		
		const tempCheckInclGST = JSON.parse(JSON.stringify(checkInclGST));
		const updatedCheckInclGST = tempCheckInclGST.filter((gstIncl, keyIter) => keyIter != key)
		setCheckInclGST(updatedCheckInclGST); 			
		
		const tempMrp = JSON.parse(JSON.stringify(mrp));
		const updatedMrp = tempMrp.filter((mrp, keyIter) => keyIter != key)
		setMrp(updatedMrp); 
		
		const tempExpiryDate = JSON.parse(JSON.stringify(expiryDate));
		const updatedExpiryDate = tempExpiryDate.filter((ed, keyIter) => keyIter != key)
		setExpiryDate(updatedExpiryDate); 			
	}
	
	const handleSupplierSelect = (e) => {
		setSupplierId(e.target.value);	
	}
	
	const dropdownSuppliersList = [];
	if(suppliers.length > 0) {
		for(let x in suppliers) {	
			dropdownSuppliersList.push(<option className="admin-options" value={suppliers[x].supplierId} > {suppliers[x].supplierName} </option>);
		}
	}
	
	const handleInvoiceDateChange = (e) => {
		setInvoiceDate(e.target.value);
	}
	
	
	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();
		
		if(	invoiceProductsList.length >0) {
			
			//check data sanity, whether all entries in table are done.
			if( 
				batch.every((element)=> element.length>0) &&
				quantity.every((element)=> element.length>0) &&
				purchasePrice.every((element)=> element.length>0) &&
				mrp.every((element)=> element.length>0) &&
				expiryDate.every((element)=> element.length>0) &&
			
				invoiceProductsList.length == batch.length &&
				invoiceProductsList.length == quantity.length &&
				invoiceProductsList.length == purchasePrice.length &&
				invoiceProductsList.length == mrp.length &&
				invoiceProductsList.length == expiryDate.length &&

				invoiceDate.length >0 &&
				supplierId.length >0
				
			) {
				const invoiceJSON = {};
				const supplierJSON = {};
				for (let x in suppliers) {						
					if(suppliers[x].supplierId == supplierId) {
						supplierJSON = suppliers[x];
					}						
				}
				
				invoiceJSON.supplier = supplierJSON;
				invoiceJSON.date = invoiceDate;
				invoiceJSON.amount = finalTotal;
				
				const batchPurchaseEntryJSON = [];
				for(let x in invoiceProductsList) {
					const tempBatchPurchaseEntryJSON = {};
					
					tempBatchPurchaseEntryJSON.batchProductId = invoiceProductsList[x].productId;
					tempBatchPurchaseEntryJSON.batchProductName = invoiceProductsList[x].productName;
					tempBatchPurchaseEntryJSON.batchProductBrand = invoiceProductsList[x].productBrand;
					tempBatchPurchaseEntryJSON.batchProductSku = invoiceProductsList[x].productSku;
					tempBatchPurchaseEntryJSON.batchNo = batch[x];
					tempBatchPurchaseEntryJSON.batchPurSaleBool = 0;
					tempBatchPurchaseEntryJSON.batchPurchasePrice = purchasePrice[x];
					tempBatchPurchaseEntryJSON.quantity = quantity[x]
					tempBatchPurchaseEntryJSON.mrp = mrp[x];
					tempBatchPurchaseEntryJSON.ppIncludesGST = checkInclGST[x];
					tempBatchPurchaseEntryJSON.expiryDate = expiryDate[x];
					
					if(!tempBatchPurchaseEntryJSON.ppIncludesGST) {
						tempBatchPurchaseEntryJSON.ppIncludesGST= false;
					}
					
					batchPurchaseEntryJSON.push(tempBatchPurchaseEntryJSON);	
				}
				
				const dto_purchase = {
					purchaseInvoice: invoiceJSON,
					batches: batchPurchaseEntryJSON
				}
				
				const requestOptionsPurchase = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dto_purchase)
				};
				
			//	const purchaseInvoiceSaveUrl = "http://localhost:8083/api/purchase-invoice" 
				
				const purchaseInvoiceSaveUrl = APIs.purchaseInvoiceSaveUrl;
				
				const savePurchase = async () => {
					try {
						const response = await fetch(purchaseInvoiceSaveUrl, requestOptionsPurchase);
					//	const jsonPurchaseInvoice = await response.json();

						if(!response.ok) {
							alert("ServerSide error.")
						}
						else {
							alert("Purchase Invoice Saved Successfully.")
							emptyForm();
							
						}	
					} 
					catch (error) {
						alert("From adminPurchaseEntry: saving purchase invoice, Server-side error. Please try later.")
					}			
				}			
				savePurchase(); 	

			}	
		}	
	}
		
		

	let invoiceTableData = [];
	
	if( invoiceProductsList.length >0) {								
		invoiceTableData = invoiceProductsList.map((prod, key) => (	
		  <tr id="admin-input-wrapper">
			  <td style={{minWidth: "150px", maxWidth:"150px"}} id="admin-table"> 
				{prod.productName} 
			  </td>
			  
			  <td style={{minWidth: "150px", maxWidth:"150px"}} id="admin-table"> 
				{prod.productBrand} 
			  </td>
				  
			  <td scope="row"  className=" px-2 " id="admin-table">  
					<input  type="date" className=" px-0 "  value={batch[key]} onChange={(e) => handleBatchChange(e,key)}  /> 
			  </td>
			  <td scope="row"  className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
					<input  type="text" className=" px-0 " value={quantity[key]} onChange={(e) => handleQuantityChange(e,key)}  />  
			  </td>
			  <td scope="row"  className=" px-2 " id="admin-table"> 
					<input  type="text" className=" px-0 " value={purchasePrice[key]} onChange={(e) => handlePurchasePriceChange(e,key)}  /> 
			  </td>
			  <td scope="row" id="admin-table"> 						
					<input type="checkbox" style={{border:"0"}} checked={checkInclGST[key]} onChange={(e) => handleInclGSTChange(e,key)}  /> 
			  </td>
			  <td scope="row"  className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
					<input type="text" className=" px-0 " value={mrp[key]} onChange={(e) => handleMrpChange(e,key)}  /> 
			  </td>
			  <td scope="row"  className=" px-2 " id="admin-table">
					<input type="date" className=" px-0 " value={expiryDate[key]} onChange={(e) => handleExpiryDateChange(e,key)}  /> 
			  </td>
			  <td scope="row" className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
				   {prod.gst} 
			  </td>
			  <td scope="row" className=" px-2 " id="admin-table" > 
				{ (quantity[key] && purchasePrice[key] ) ? quantity[key] * purchasePrice[key] : 0 }
				</td>
			  <td scope="row" id="admin-table" > 					
					<a onClick={()=> deleteInvoiceEntry(key)}><img style={{width: "20px", height:"20px", border:"none"}} src="/assets/imgs/icons/file-x.svg"></img></a> 						
			  </td>				  
		  </tr>
		))
	}
		
	const handleProductSearchSubmit = (e) => {		
		e.preventDefault();
		setSearchProductToggle(!searchProductToggle);
	}
	const handlePreviousProductsList = () => {
		setCurrentPage(currentPage - 1);
		setSearchProductToggle(!searchProductToggle);
	}
	
	const handleNextProductsList = () => {
		setCurrentPage(currentPage + 1);
		setSearchProductToggle(!searchProductToggle);
	}
	
return(	
	<>
		 <div className="container">			
				<div className="row my-2">  
					<div className="col-3">
						<div>
							<form className="d-flex flex-column mx-4 my-4" onSubmit={handleProductSearchSubmit}>				
								<input type="text" className=" form-control mb-3" value={searchProduct}  style={{borderRadius:"0px"}} placeholder="Search Product" onChange={handleSearchNameChange}  />				
							</form>
						</div>
						<div>		
								{buttonsSearchProductsList}
						</div>
						<div classNamee="d-inline-flex">					
							{ startIndex != 0 &&	
							<button type="button" className="mt-20" onClick={handlePreviousProductsList} style={{
																							height: "30px",
																							width: "90px",
																							background: "#168cee",
																							color:"#ffffff",
																							fontSize: "12px",
																							border: "none"
																						}}
							> Previous </button> }
							
							{ startIndex < (count - itemsPerPage) &&	
								<button type="button" className="ml-5 mt-20" onClick={handleNextProductsList} style={{
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
						
					<div className="col-9 mt-20" style={{borderLeft: "3px solid"}}>
						<form onSubmit={handleInvoiceSubmit}>
							<div >
								<div>	
									<table className="table" mt-10 >
										<thead style={{
											border: "1px solid #000000",	
											position: "sticky",
											top: 0,																	
											right: 0,
											backgroundColor: "#a1d1f8"}}>
											<tr> 
												<th scope="col" className="pl-4 " id="admin-table">Product</th> 
												<th scope="col" className="pl-4 " id="admin-table">Brand</th> 
												<th scope="col" className="pl-4 " id="admin-table">Batch</th> 
												<th scope="col" className="pl-4 " id="admin-table"> Qty</th> 
												<th scope="col" className="pl-4 " id="admin-table"> Purchase Price (Rs) </th> 
												<th scope="col" className="pl-4 " id="admin-table"> Includes GST? </th> 
												<th scope="col" className="pl-4 " id="admin-table"> MRP (Rs) </th> 
												<th scope="col" className="pl-4 " id="admin-table"> Expiry </th> 
												<th scope="col" className="pl-4 " id="admin-table"> Tax </th> 
												<th scope="col" className="pl-4 " id="admin-table"> Total </th> 
												<th scope="col" className="pl-4 " id="admin-table"> Delete </th> 
											</tr>														
										</thead>	
										<tbody>
											{invoiceTableData}					   				
										</tbody>	
									</table>
								</div>
							</div>
							
							<div className="row mt-10">
								<div className="col-9">
									<table className="table" mt-20 >
										<thead>
											<tr> 
												<th scope="col" className="pl-4 " style={{ textAlign: "center" }}>Supplier</th> 
												<th scope="col" className="pl-4 " style={{ textAlign: "center" }}>Invoice Date</th> 
												<th scope="col" className="pl-4 " style={{ textAlign: "center" }}> Amount</th> 
												<th scope="col" className="pl-4 " style={{ textAlign: "center" }}> Payment Details </th> 
											</tr>									
										</thead>	
										<tbody>
											<tr id="admin-input-wrapper"> 
												<td scope="col" className="pl-4 " style={{ textAlign: "center" }}>
													<select value={supplierId}   className="form-select" onChange={handleSupplierSelect}>
														<option value="" disabled selected hidden> Select Supplier </option>
														{dropdownSuppliersList} 
													</select> 
												</td> 
												<td scope="col" className="pl-4 " style={{ textAlign: "center" }}>
													<input  type="date" className=" px-0 "  value={invoiceDate} onChange={(e) => handleInvoiceDateChange(e)}  /> 
												</td> 
												<td scope="col" className="pl-4 " style={{ textAlign: "center" }}> 
													{finalTotal}
												</td> 
												<td scope="col" className="pl-4 " style={{ textAlign: "center" }}> 
													--
												</td> 
											</tr>					   				
										</tbody>	
									</table>
								</div>
								<div className="col-3 d-inline-flex justify-content-center align-items-center">
									<button type="submit" className="btn-admin save-purchase-invoice">
										Submit
									</button>
								</div>
							</div>
						</form>	
					</div>	
					
				</div>				
		</div>	 
	
	</>	
)}


export default ComponentPurchaseEntry;