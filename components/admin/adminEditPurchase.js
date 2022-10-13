import React from "react";
import { useEffect, useState } from "react";
import AdminButtonProduct from "./adminButtonProduct";
import * as APIs from "./../../util/springAPIs";
//import ProductBatchesDialog from "./adminProductBatchesDialog"

const ComponentEditPurchase = ({editPurchaseInvoiceId}) => {

	const [editPurchaseInvoice, setEditPurchaseInvoice] = useState("");

	const [invoiceDate, setInvoiceDate] = useState("");
//	const [dateJSON, setDateJSON] = useState("");
	
	const [searchProduct, setSearchProduct] = useState("");
	const [searchProductResult, setSearchProductResult] = useState("");
//	const [selKey, setSelKey] = useState("");
	const [searchProductToggle, setSearchProductToggle] = useState(false);
	
//	const [selectedDTO, setSelectedDTO] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("");
	const [selectedBatchToggle, setSelectedBatchToggle] = useState(false);
	
	const [supplierName, setSupplierName] = useState("");
	
	const [invoiceProductsList, setInvoiceProductsList] = useState([]);	
	const [quantity, setQuantity] = useState([]);
	const [purchasePrice, setPurchasePrice] = useState([]);
	const [mrp, setMrp] = useState([]);
	const [availableStock, setAvailableStock] = useState("");
	const [expiryDate, setExpiryDate] = useState([]);
	const [batch, setBatch] = useState([]);
	const [ppIncludesGST, setPpIncludesGST] = useState([]);
	const [amount, setAmount] = useState(0);
	const [prodBatchesDialogDisp, setProdBatchesDialogDisp] = useState(false);
	const [purchaseSourceType, setPurchaseInvoiceSourceType] = useState("");	
	
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);

	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	useEffect( () => {
		
		if (editPurchaseInvoiceId) {

		//	const fetchPurchaseInvoiceUrl = "http://localhost:8083/api/purchase-invoice/" + editPurchaseInvoiceId; 	

			const fetchPurchaseInvoiceUrl = APIs.fetchPurchaseInvoiceUrl + editPurchaseInvoiceId; 
			
			const fetchPurchaseInvoiceData = async () => {
				try {
					const response = await fetch(fetchPurchaseInvoiceUrl);
					const json = await response.json();
					setEditPurchaseInvoice(json);
					console.log("from edit purchase")
					console.log(json)
					
					} 
				catch (error) {
					alert("From adminEditPurchaseInvoice: fetching purchase, Server-side error. Please try later.")
				}			
			}			
			fetchPurchaseInvoiceData();	
		}	
		
	},[editPurchaseInvoiceId])
	
	
	useEffect( () => {		
		if(editPurchaseInvoice.purchaseInvoice != null) {	
			setSupplierName(editPurchaseInvoice.purchaseInvoice.supplier.supplierName)
			
			
		let dd = editPurchaseInvoice.purchaseInvoice.dateCreated.substring(8);
		let mm = editPurchaseInvoice.purchaseInvoice.dateCreated.substring(5,7);
		let yyyy = editPurchaseInvoice.purchaseInvoice.dateCreated.substring(0,4);

		setInvoiceDate(dd + ' / ' + mm + ' / ' + yyyy);
			
		//	const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
		const tempInvoiceList = [];
		const tempQuantity = [];				
		const tempPurchasePrice = [];
		const tempMrp = [];
		const tempExpiryDate = [];
		const tempPpIncludesGST = [];
		const tempBatch = [];
			
		for (let x in editPurchaseInvoice.batches) {
			
			const invoiceEntry = {};
			invoiceEntry.batchId = editPurchaseInvoice.batches[x].batchId;     
			invoiceEntry.batchPurchaseInvoiceId = editPurchaseInvoiceId;
			invoiceEntry.productId = editPurchaseInvoice.batches[x].batchProductId;
			invoiceEntry.productName = editPurchaseInvoice.batches[x].batchProductName;
			invoiceEntry.productBrand = editPurchaseInvoice.batches[x].batchProductBrand;
			invoiceEntry.productSku = editPurchaseInvoice.batches[x].batchProductSku;
			invoiceEntry.batch = editPurchaseInvoice.batches[x].batchNo;
			invoiceEntry.batchPurchasePrice = editPurchaseInvoice.batches[x].batchPurchasePrice;
			invoiceEntry.gst = editPurchaseInvoice.batches[x].gst;
			invoiceEntry.ppIncludesGST = editPurchaseInvoice.batches[x].ppIncludesGST;
			invoiceEntry.mrp = editPurchaseInvoice.batches[x].mrp;	
			invoiceEntry.expiryDate = editPurchaseInvoice.batches[x].expiryDate;
	//		invoiceEntry.batch = editPurchaseInvoice.batches[x].batchNo;
			tempInvoiceList.push(invoiceEntry);	
			tempQuantity[x] = editPurchaseInvoice.batches[x].quantity;	
			tempPurchasePrice[x] = editPurchaseInvoice.batches[x].batchPurchasePrice;
			tempMrp[x] = editPurchaseInvoice.batches[x].mrp;
			tempExpiryDate[x] = editPurchaseInvoice.batches[x].expiryDate;
			tempPpIncludesGST[x] = editPurchaseInvoice.batches[x].ppIncludesGST;
			tempBatch[x] = editPurchaseInvoice.batches[x].batchNo;
		}			
		setInvoiceProductsList(tempInvoiceList);
		setPurchasePrice(tempPurchasePrice);
		setQuantity(tempQuantity);
		setMrp(tempMrp);
		setExpiryDate(tempExpiryDate);
		setPpIncludesGST(tempPpIncludesGST);
		setBatch(tempBatch);
		}
				
	},[editPurchaseInvoice])		
/*	
	useEffect(()=>{
			if(selKey) {	
				const invoiceEntry = {};
				
					invoiceEntry.productId = searchProductResult[selKey].product.productId;
					invoiceEntry.productName = searchProductResult[selKey].product.productName;
					invoiceEntry.productSku = searchProductResult[selKey].product.sku;
					invoiceEntry.productBrand = searchProductResult[selKey].product.brand.brandName;
					invoiceEntry.batch = selectedBatch; // need to write date as batch
					invoiceEntry.batchId = 0;

				const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
				tempInvoiceList.push(invoiceEntry);
				setInvoiceProductsList(tempInvoiceList);

				const tempSellingPrice = JSON.parse(JSON.stringify(sellingPrice));
				tempSellingPrice.push(invoiceEntry.mrp)
				setSellingPrice(tempSellingPrice);
			}	
			
	},[])
*/	
	
	useEffect(() => {	

		const multiplyQuantityPriceArray = quantity.map((qty, key)=>{			
			if(qty && purchasePrice[key]) {
				
				if(ppIncludesGST[key] == true) {
					return(qty * purchasePrice[key])
				} 
				else {
					return(qty * purchasePrice[key]*(1 + invoiceProductsList[key].gst / 100))
				}
			}
			else {
				return 0;
			}
		})
		
		const sum = 0;
		for (let x in multiplyQuantityPriceArray) {
			sum = sum + multiplyQuantityPriceArray[x];
		}
		
		setAmount(sum);
		
	},[quantity, purchasePrice, ppIncludesGST])
	
	
	const emptyForm = () => {		
		const invoiceProductsListTemp = [];	
		for(let x in invoiceProductsList){
			invoiceProductsListTemp[x] == ""
		}
		setInvoiceProductsList(invoiceProductsListTemp);
					
		const quantityTemp = [];
		for(let x in quantity){
			quantityTemp[x] == ""
		}
		setQuantity(quantityTemp);
				
		const purchasePriceTemp = [];
		for(let x in purchasePrice){
			purchasePriceTemp[x] == ""
		}
		setPurchasePrice(purchasePriceTemp);	
		
		const mrpTemp = [];
		for(let x in mrp){
			mrpTemp[x] == ""
		}
		setMrp(mrpTemp);
		
		const ppIncludesGSTTemp = [];
		for(let x in ppIncludesGST){
			ppIncludesGSTTemp[x] == ""
		}
		setPpIncludesGST(ppIncludesGSTTemp); 
				
		const expiryDateTemp = [];
		for(let x in expiryDate){
			expiryDateTemp[x] == ""
		}
		setExpiryDate(expiryDateTemp);
		
		const batchTemp = [];
		for(let x in batch){
			batchTemp[x] == ""
		}
		setBatch(batchTemp);
		
		setSupplierName("");	
		setSearchProductResult("");
		setSearchProduct("");
		setEditPurchaseInvoice("");

	}
			
	const handleProductSearchNameChange = (e) => {
		setSearchProduct(e.target.value);
	}
	
	const handleProductSearchSubmit = (e) => {		
		e.preventDefault();
		setSearchProductToggle(!searchProductToggle);	
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
							console.log(json)
				} 
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}			
			}			
			searchProd();	
		}	
	},[searchProductToggle])
	
	const handleSelectedProduct = (selectedKey) => {			
	//	setSelKey(selectedKey);
		
		const invoiceEntry = {};
	
		invoiceEntry.productId = searchProductResult[selectedKey].product.productId;
		invoiceEntry.productName = searchProductResult[selectedKey].product.productName;
		invoiceEntry.productSku = searchProductResult[selectedKey].product.sku;
		invoiceEntry.productBrand = searchProductResult[selectedKey].product.brand.brandName;
		invoiceEntry.gst = searchProductResult[selectedKey].product.gst;
	//	invoiceEntry.batch = selectedBatch; // need to write date as batch
		invoiceEntry.batchId = 0;
		invoiceEntry.display = 1;

		const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
		tempInvoiceList.push(invoiceEntry);
		setInvoiceProductsList(tempInvoiceList);
	
	}
	
	const buttonsSearchProductsList = [];
	if(searchProductResult.length > 0) {
		
		for(let x in searchProductResult) {				
			buttonsSearchProductsList.push(<AdminButtonProduct dto={searchProductResult[x]} selectedKey={x}  handleSelectedProduct={handleSelectedProduct} />);
		}			
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
	
	const handleBatchChange = (e, key) => {
		const tempBatch = JSON.parse(JSON.stringify(batch));
		tempBatch[key] = e.target.value;
		setBatch(tempBatch);
	}
	
	const handlePpIncludesGSTChange = (e, key) => {
		const tempPpIncludesGST = JSON.parse(JSON.stringify(ppIncludesGST));
		tempPpIncludesGST[key] = !tempPpIncludesGST[key];
		setPpIncludesGST(tempPpIncludesGST);	
	}

	const deleteInvoiceEntry = (key) => {
		
	 	const tempInvoiceProductsList = JSON.parse(JSON.stringify(invoiceProductsList));	
		const updatedInvoiceProductsList = tempInvoiceProductsList.filter((product, keyIter) => key != keyIter)
		setInvoiceProductsList(updatedInvoiceProductsList); 	
		
		const tempQuantity = JSON.parse(JSON.stringify(quantity));	
		const updatedQuantity = tempQuantity.filter((qty, keyIter) => key != keyIter)
		setQuantity(updatedQuantity); 	
		
		const tempPpIncludeslGST = JSON.parse(JSON.stringify(ppIncludesGST));	
		const updatedPpIncludesGST = tempQuantity.filter((qty, keyIter) => key != keyIter)
		setQuantity(updatedPpIncludesGST); 
		
		const tempMrp = JSON.parse(JSON.stringify(mrp));	
		const updatedMrp = tempMrp.filter((qty, keyIter) => key != keyIter)
		setMrp(updatedMrp); 
		
		const tempPurchasePrice = JSON.parse(JSON.stringify(purchasePrice));	
		const updatedPurchasePrice = tempPurchasePrice.filter((qty, keyIter) => key != keyIter)
		setQuantity(updatedPurchasePrice); 
		
		const tempExpiryDate = JSON.parse(JSON.stringify(expiryDate));	
		const updatedExpiryDate = tempExpiryDate.filter((qty, keyIter) => key != keyIter)
		setExpiryDate(updatedExpiryDate);
	
		const tempBatch = JSON.parse(JSON.stringify(batch));	
		const updatedBatch = tempBatch.filter((qty, keyIter) => key != keyIter)
		setBatch(updatedBatch);
		
	}

	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();	
		
		if(	invoiceProductsList.length >0) {
			
			//check data sanity, whether all entries in table are done.
			if( 				
				quantity.every((element)=> element) &&
				purchasePrice.every((element)=> element) &&
				mrp.every((element)=> element) &&
				batch.every((element)=> element) &&
				expiryDate.every((element)=> element) &&
				
				invoiceProductsList.length == quantity.length &&
				invoiceProductsList.length == purchasePrice.length &&
				invoiceProductsList.length == mrp.length &&
				invoiceProductsList.length == batch.length &&
				invoiceProductsList.length == expiryDate.length
				
			) {
				const confirmPurchaseInvoice = confirm("Are you sure that you want to submit the edited purchase?");	
				if(confirmPurchaseInvoice == true){
				
					const purchaseJSON = {};
					const supplierJSON = {};

				//	purchaseJSON.date = dateJSON;
					purchaseJSON.purchaseInvoiceId = editPurchaseInvoiceId;
					purchaseJSON.amount = amount;
					
					const batchesPurchaseInvoicesEntryJSON = [];
					for(let x in invoiceProductsList) {
						const tempBatchesPurchaseInvoicesEntryJSON = {};
						
						tempBatchesPurchaseInvoicesEntryJSON.batchPurchaseInvoiceId = editPurchaseInvoiceId;
						tempBatchesPurchaseInvoicesEntryJSON.batchId = invoiceProductsList[x].batchId;
						tempBatchesPurchaseInvoicesEntryJSON.batchProductId = invoiceProductsList[x].productId;
						tempBatchesPurchaseInvoicesEntryJSON.batchProductName = invoiceProductsList[x].productName;
						tempBatchesPurchaseInvoicesEntryJSON.batchProductBrand = invoiceProductsList[x].productBrand;
						tempBatchesPurchaseInvoicesEntryJSON.batchProductSku = invoiceProductsList[x].productSku;
						tempBatchesPurchaseInvoicesEntryJSON.display = invoiceProductsList[x].display;
						tempBatchesPurchaseInvoicesEntryJSON.batchNo = batch[x];
						tempBatchesPurchaseInvoicesEntryJSON.batchPurSaleBool = 0;
						tempBatchesPurchaseInvoicesEntryJSON.quantity = quantity[x]
						tempBatchesPurchaseInvoicesEntryJSON.batchPurchasePrice = purchasePrice[x];
						tempBatchesPurchaseInvoicesEntryJSON.ppIncludesGST = ppIncludesGST[x];
						tempBatchesPurchaseInvoicesEntryJSON.mrp = mrp[x];
						tempBatchesPurchaseInvoicesEntryJSON.expiryDate = expiryDate[x];
						
						batchesPurchaseInvoicesEntryJSON.push(tempBatchesPurchaseInvoicesEntryJSON);	
					}

					
					const dto = {					
						purchaseInvoice: purchaseJSON,
						batches: batchesPurchaseInvoicesEntryJSON
					}
					
					const requestOptionsSales = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dto)
					};
					
				//	const salesInvoiceUpdateUrl = "http://localhost:8083/api/purchase-update" 
					
					const purchaseInvoiceUpdateUrl = APIs.purchaseInvoiceUpdateUrl;
					
					const saveSales = async () => {
						try {
							const response = await fetch(purchaseInvoiceUpdateUrl, requestOptionsSales);
						//	const jsonPurchaseInvoice = await response.json();

							if(!response.ok) {
								alert("HTTP error.")
							}
							else {
								alert("PurchaseInvoice Updated Successfully.")
								emptyForm();
								
							}	
						} 
						catch (error) {
							alert("From adminUpdatePurchaseInvoice: updating purchase, HTTP/ Network error. Please try later.")
						}			
					}			
					saveSales(); 	
				}
			}	
		}		
	}

	let invoiceTableData = [];

	if( invoiceProductsList.length >0) {								
		invoiceTableData = invoiceProductsList.map((prod, key) => (	
		  <tr id="admin-input-wrapper">
			  <td style={{minWidth: "130px"}} id="admin-table"> 
				{prod.productName} 
			  </td>
			  
			  <td style={{minWidth: "130px"}} id="admin-table"> 
				   {prod.productBrand} 
			  </td>
				  
			  <td scope="row"  className=" px-2 " style={{minWidth: "130px"}} id="admin-table">   
				  {/*	{prod.batch.substring(8) + "-" + prod.batch.substring(5,7) + "-" + prod.batch.substring(0,4)} */}
				  <input  type="date" className=" px-0 " value={batch[key]} onChange={(e) => handleBatchChange(e,key)}  />	
			  </td> 
			  
			  <td scope="row"  className=" px-2 " style={{minWidth: "50px"}} id="admin-table"> 
				<input  type="text" className=" px-0 " value={quantity[key]} onChange={(e) => handleQuantityChange(e,key)}  />  
			  </td>			  
		  
			  <td scope="row"  className=" px-2 " style={{minWidth: "80px"}} id="admin-table"> 
				  <input  type="text" className=" px-0 " value={purchasePrice[key]} onChange={(e) => handlePurchasePriceChange(e,key)}  /> 
			  </td>

			  <td scope="row"  className=" px-2 " style={{minWidth: "80px"}} id="admin-table"> 
				  <input type="checkbox" style={{border:"0"}} checked={ppIncludesGST[key]} onChange={(e) => handlePpIncludesGSTChange(e,key)}  /> 
			  </td>
			  
			  <td scope="row"  className=" px-2 " style={{minWidth: "50px"}} id="admin-table"> 
				  <input  type="text" className=" px-0 " value={mrp[key]} onChange={(e) => handleMrpChange(e,key)}  /> 
			  </td>	
			  
			  <td scope="row"  className=" px-2 " style={{minWidth: "130px"}} id="admin-table">
					<input  type="date" className=" px-0 " value={expiryDate[key]} onChange={(e) => handleExpiryDateChange(e,key)}  /> 
			  </td> 

			  <td scope="row"  className=" px-2 " id="admin-table">
					{prod.gst}
			  </td>			  
			  
			  <td scope="row" className=" px-2 " id="admin-table"> 
				{ (quantity[key] && purchasePrice[key] ) ? ( ppIncludesGST[key] ? quantity[key] * purchasePrice[key] : quantity[key] * purchasePrice[key] * (1 + prod.gst/100) ) : 0 } 				
				</td> 
				
			  <td scope="row" id="admin-table"> 					
					<a onClick={()=> deleteInvoiceEntry(key)}><img style={{width: "20px", height:"20px", border:"none"}} src="/assets/imgs/icons/file-x.svg"></img></a> 						
			  </td>				  
		  </tr>
		))
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
								<input type="text" className=" form-control " value={searchProduct} placeholder="Search Product" style={{borderRadius:"0px"}} onChange={handleProductSearchNameChange}  />
			
							</form>
						</div>
						<div className="">
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
						
					<div className="col-8 mt-20" style={{borderLeft: "3px solid"}}>
						<form onSubmit={handleInvoiceSubmit}>
							<div className="row purchase-invoice-form" >
								<div>
									
									<table className="table">
										<thead style={{
											border: "1px solid #000000",	
											position: "sticky",
											top: 0,																	
											right: 0,
											backgroundColor: "#a1d1f8"}}>
											<tr > 
												<th scope="col" className="pl-4 " id="admin-table">Product</th> 
												<th scope="col" className="pl-4 " id="admin-table">Brand</th>
												<th scope="col" className="pl-4 " id="admin-table">Batch</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> Qty</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> Purchase Price (Rs)</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> Includes GST?</th> 												
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> MRP (Rs) </th> 
												<th scope="col" className="pl-4 " id="admin-table" > Expiry </th> 
												<th scope="col" className="pl-4 " id="admin-table" > Tax </th>
												<th scope="col" className="pl-4 " id="admin-table" > Total </th> 
												<th scope="col" className="pl-4 " id="admin-table" > Delete </th> 
											</tr>														
										</thead>	
										<tbody>
											{invoiceTableData}					   				
										</tbody>	
									</table>
									
								</div>
							</div>
							
							<hr style={{height:"3px", backgroundColor:"#7E7E7E", border:0, marginLeft:"-12px", marginRight:"-12px", opacity:1}}/>
							
							<div className="row mt-10">
								<div className="col-9 flex-column">
									<table className="table" mt-20 >
										<thead>
											<tr> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Supplier Name</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Invoice Date</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}> Total </th> 
											</tr>									
										</thead>	
										<tbody>
											<tr id="admin-input-wrapper"> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
													{supplierName}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
														{invoiceDate}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}> 
													{amount}
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


export default ComponentEditPurchase;