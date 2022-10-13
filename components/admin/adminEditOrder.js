import React from "react";
import { useEffect, useState } from "react";
import AdminButtonProduct from "./adminButtonProduct";
import ProductBatchesDialog from "./adminProductBatchesDialog"
import * as APIs from "./../../util/springAPIs";

const ComponentEditOrder = ({editOrderId}) => {

	const [editOrder, setEditOrder] = useState("");

	const [invoiceDate, setInvoiceDate] = useState(new Date());
//	const [dateJSON, setDateJSON] = useState("");
	
	const [searchProduct, setSearchProduct] = useState("");
	const [searchProductResult, setSearchProductResult] = useState("");
	const [selKey, setSelKey] = useState("");
	const [searchProductToggle, setSearchProductToggle] = useState(false);
	
//	const [selectedDTO, setSelectedDTO] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("");
	const [selectedBatchToggle, setSelectedBatchToggle] = useState(false);
	
	const [customerName, setCustomerName] = useState("");
	const [custSearchDisp, setCustSearchDisp] = useState(false);
	const [addNewCustomerDisp, setAddNewCustomerDisp] = useState(false);
	
	const [invoiceProductsList, setInvoiceProductsList] = useState([]);	
	const [quantity, setQuantity] = useState([]);
	const [availableStock, setAvailableStock] = useState("");
	const [sellingPrice, setSellingPrice] = useState([]);
	const [shippingCharges, setShippingCharges] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [prodBatchesDialogDisp, setProdBatchesDialogDisp] = useState(false);
	const [orderSourceType, setOrderSourceType] = useState("");	
	
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);

	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	const orderCreationDate = new Date();
	
	useEffect( () => {
		
		if (editOrderId) {

		//	const fetchOrderUrl = "http://localhost:8083/api/order/" + editOrderId; 

			const fetchOrderUrl = APIs.fetchOrderUrl + editOrderId; ;

			
			const fetchOrderData = async () => {
				try {
					const response = await fetch(fetchOrderUrl);
					const json = await response.json();
					setEditOrder(json);
					console.log(json)
					
					} 
				catch (error) {
					alert("From adminEditOrder: fetching order, Server-side error. Please try later.")
				}			
			}			
			fetchOrderData();	
		}	
		
	},[editOrderId])
	
	
	useEffect( () => {		
		if(editOrder.order != null) {	
			setCustomerName(editOrder.order.customer.fullName)
			setOrderSourceType(editOrder.order.orderSourceType);
			setShippingCharges(editOrder.order.shippingCharges);
			
		orderCreationDate.setTime(Date.parse(editOrder.order.dateTimeCreated));
		
	//	let dd = editOrder.order.dateCreated.substring(8);
	//	let mm = editOrder.order.dateCreated.substring(5,7);
	//	let yyyy = editOrder.order.dateCreated.substring(0,4);

	//	setInvoiceDate(dd + ' / ' + mm + ' / ' + yyyy);
	
		setInvoiceDate(orderCreationDate);
			
		//	const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
			const tempInvoiceList = [];
			const tempQuantity = [];
			const tempSellingPrice = [];			
			
			for (let x in editOrder.batches) {
				
				const invoiceEntry = {};
				invoiceEntry.batchId = editOrder.batches[x].batchId;     
				invoiceEntry.batchOrderId = editOrderId;
				invoiceEntry.productId = editOrder.batches[x].batchProductId;
				invoiceEntry.productName = editOrder.batches[x].batchProductName;
				invoiceEntry.productBrand = editOrder.batches[x].batchProductBrand;
				invoiceEntry.productSku = editOrder.batches[x].batchProductSku;
				invoiceEntry.batch = editOrder.batches[x].batchNo;
				invoiceEntry.mrp = editOrder.batches[x].mrp;	
				invoiceEntry.expiryDate = editOrder.batches[x].expiryDate;
				invoiceEntry.batchPurchasePrice = editOrder.batches[x].batchPurchasePrice;
				invoiceEntry.ppIncludesGST = editOrder.batches[x].ppIncludesGST;
				tempInvoiceList.push(invoiceEntry);	
				tempQuantity[x] = editOrder.batches[x].quantity;
				tempSellingPrice[x] = editOrder.batches[x].sellingPrice;				
			}			
			setInvoiceProductsList(tempInvoiceList);
			setQuantity(tempQuantity);
			setSellingPrice(tempSellingPrice);
		}
				
	},[editOrder])		
	
	useEffect(()=>{
		
		if(selectedBatch.length >0) {
				
				let checkRepeatBatch = 0;		
				for(let x in invoiceProductsList) {
					if(invoiceProductsList[x].batch == selectedBatch && invoiceProductsList[x].productId == searchProductResult[selKey].product.productId) {
						checkRepeatBatch = 1;
					}	
				}
				
				if(checkRepeatBatch == 0) {
				
				const invoiceEntry = {};
				
					invoiceEntry.productId = searchProductResult[selKey].product.productId;
					invoiceEntry.productName = searchProductResult[selKey].product.productName;
					invoiceEntry.productSku = searchProductResult[selKey].product.sku;
					invoiceEntry.productBrand = searchProductResult[selKey].product.brand.brandName;
					invoiceEntry.batch = selectedBatch;
					invoiceEntry.batchId = 0;
							
				for(let x in searchProductResult[selKey].batchesData){	
					if(searchProductResult[selKey].batchesData[x].batchNo == selectedBatch) {
						
					//	invoiceEntry.availableStock = searchProductResult[selKey].batchesData[x][1];
						invoiceEntry.mrp = searchProductResult[selKey].batchesData[x].mrp;
						invoiceEntry.expiryDate = searchProductResult[selKey].batchesData[x].expiryDate;
						invoiceEntry.batchPurchasePrice = searchProductResult[selKey].batchesData[x].batchPurchasePrice;
						invoiceEntry.ppIncludesGST = searchProductResult[selKey].batchesData[x].ppIncludesGST;		
					}				
				}

				const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
				tempInvoiceList.push(invoiceEntry);
				setInvoiceProductsList(tempInvoiceList);

				const tempSellingPrice = JSON.parse(JSON.stringify(sellingPrice));
				tempSellingPrice.push(invoiceEntry.mrp)
				setSellingPrice(tempSellingPrice);
			}
			
		}	
						
	},[selectedBatchToggle])
	
	
	useEffect(() => {	

		const multiplyQuantityPriceArray = quantity.map((qty, key)=>{			
			if(qty && sellingPrice[key]) {
				return(qty * sellingPrice[key])
			}
			else {
				return 0;
			}
		})
		
		const sum = 0;
		for (let x in multiplyQuantityPriceArray) {
			sum = sum + multiplyQuantityPriceArray[x];
		}
		
		setSubTotal(sum);
		
	},[quantity, sellingPrice, shippingCharges])
	
	
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
				
		const sellingPriceTemp = [];
		for(let x in sellingPrice){
			sellingPriceTemp[x] == ""
		}
		setSellingPrice(sellingPriceTemp);	
		
		setOrderSourceType("");
		setShippingCharges(0);	
		setCustomerName("");	
		setSearchProductResult("");
		setSearchProduct("");
		setEditOrder("");

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
		setSelKey(selectedKey);		
		setProdBatchesDialogDisp(true);			
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
	
	const handleSellingPriceChange = (e, key) => {
		const tempSellingPrice = JSON.parse(JSON.stringify(sellingPrice));
		tempSellingPrice[key] = e.target.value;
		setSellingPrice(tempSellingPrice);		
	}


	const deleteInvoiceEntry = (key) => {
		
	 	const tempInvoiceProductsList = JSON.parse(JSON.stringify(invoiceProductsList));	
		const updatedInvoiceProductsList = tempInvoiceProductsList.filter((product, keyIter) => key != keyIter)
		setInvoiceProductsList(updatedInvoiceProductsList); 	
		
		const tempQuantity = JSON.parse(JSON.stringify(quantity));	
		const updatedQuantity = tempQuantity.filter((qty, keyIter) => key != keyIter)
		setQuantity(updatedQuantity); 	
				
		const tempSellingPrice = JSON.parse(JSON.stringify(sellingPrice));	
		const updatedSellingPrice = tempSellingPrice.filter((sp, keyIter) => key != keyIter)
		setSellingPrice(updatedSellingPrice);  
		
	}

	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();	
		
		const confirmOrder = confirm("Are you sure that you want to submit the edited order?");
		
		if(confirmOrder == true) {
		
			if(	invoiceProductsList.length >0) {
				
				//check data sanity, whether all entries in table are done.
				if( 				
					quantity.every((element)=> element) &&
					sellingPrice.every((element)=> element) &&
					
					invoiceProductsList.length == quantity.length &&
					invoiceProductsList.length == sellingPrice.length 
					
				) {
					
					const orderJSON = {};
					const customerJSON = {};

				//	orderJSON.date = dateJSON;
					orderJSON.orderId = editOrderId;
					orderJSON.subTotal = subTotal;
					orderJSON.shippingCharges = shippingCharges;
					
					const batchesOrdersEntryJSON = [];
					for(let x in invoiceProductsList) {
						const tempBatchesOrdersEntryJSON = {};
						
						tempBatchesOrdersEntryJSON.batchOrderId = editOrderId;
						tempBatchesOrdersEntryJSON.batchId = invoiceProductsList[x].batchId;
						tempBatchesOrdersEntryJSON.batchProductId = invoiceProductsList[x].productId;
						tempBatchesOrdersEntryJSON.batchProductName = invoiceProductsList[x].productName;
						tempBatchesOrdersEntryJSON.batchProductBrand = invoiceProductsList[x].productBrand;
						tempBatchesOrdersEntryJSON.batchProductSku = invoiceProductsList[x].productSku;
						tempBatchesOrdersEntryJSON.batchNo = invoiceProductsList[x].batch;
						tempBatchesOrdersEntryJSON.batchPurSaleBool = 1;
						tempBatchesOrdersEntryJSON.quantity = quantity[x]
						tempBatchesOrdersEntryJSON.batchPurchasePrice = invoiceProductsList[x].batchPurchasePrice;
						tempBatchesOrdersEntryJSON.ppIncludesGST = invoiceProductsList[x].ppIncludesGST;
						tempBatchesOrdersEntryJSON.mrp = invoiceProductsList[x].mrp;
						tempBatchesOrdersEntryJSON.sellingPrice = sellingPrice[x];
						tempBatchesOrdersEntryJSON.expiryDate = invoiceProductsList[x].expiryDate;
						
						batchesOrdersEntryJSON.push(tempBatchesOrdersEntryJSON);	
					}
					
					const dto = {					
						order: orderJSON,
						batches: batchesOrdersEntryJSON
					}
					
					const requestOptionsSales = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dto)
					};
					
				//	const salesInvoiceUpdateUrl = "http://localhost:8083/api/order-update" 
					
					const salesInvoiceUpdateUrl = APIs.salesInvoiceUpdateUrl;
					
					
					
					const saveSales = async () => {
						try {
							const response = await fetch(salesInvoiceUpdateUrl, requestOptionsSales);
						//	const jsonPurchaseInvoice = await response.json();

							if(!response.ok) {
								alert("HTTP error.")
							}
							else {
								alert("Order Updated Successfully.")
								emptyForm();
								
							}	
						} 
						catch (error) {
							alert("From adminUpdateOrder: updating order, HTTP/ Network error. Please try later.")
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
			  <td style={{minWidth: "130px", maxWidth:"130px"}} id="admin-table"> 
				{prod.productName} 
			  </td>
			  
			  <td style={{minWidth: "130px", maxWidth:"130px"}} id="admin-table"> 
				   {prod.productBrand} 
			  </td>
				  
			  <td scope="row"  className=" px-2 " id="admin-table">   
					{prod.batch.substring(8) + "-" + prod.batch.substring(5,7) + "-" + prod.batch.substring(0,4)}
			  </td> 
			  <td scope="row"  className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
					<input  type="text" className=" px-0 " value={quantity[key]} onChange={(e) => handleQuantityChange(e,key)}  />  
			  </td>


			  <td scope="row"  className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
				  {prod.mrp}
			  </td>
			  
			  <td scope="row" className=" px-2 " style={{minWidth: "50px", maxWidth:"50px"}} id="admin-table"> 
				<input type="text" className=" px-0 " value={sellingPrice[key]} onChange={(e) => handleSellingPriceChange(e,key)}  />
			  </td>
			  
			  <td scope="row"  className=" px-2 " id="admin-table">
					{prod.expiryDate.substring(8) + "-" + prod.expiryDate.substring(5,7) + "-" + prod.expiryDate.substring(0,4)}
			  </td>  
			  
			  <td scope="row" className=" px-2 " id="admin-table"> 
				{ (quantity[key] && sellingPrice[key] ) ? quantity[key] * sellingPrice[key] : 0 }
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
						
					<div className="col-9 mt-20" style={{borderLeft: "3px solid"}}>
						<form onSubmit={handleInvoiceSubmit}>
							<div className="row purchase-invoice-form" style={{height: "60vh", overflowY:"scroll"}}>
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
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> MRP (Rs) </th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ maxWidth:"50px"}}> Selling Price (Rs) </th> 
												<th scope="col" className="pl-4 " id="admin-table" > Expiry </th> 
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
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Customer Name</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Invoice Date</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center", width:"50px"  }}> Shipping Charges</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}> Total </th> 
											</tr>									
										</thead>	
										<tbody>
											<tr id="admin-input-wrapper"> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
													{customerName}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
														{invoiceDate.toLocaleDateString('en-GB')}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center"}}> 
													<input value={shippingCharges} className="" onChange={(e)=>setShippingCharges(e.target.value)}/>
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}> 
													{subTotal + parseInt(shippingCharges)}
												</td> 
											</tr>					   				
										</tbody>	
									</table>
									<div className ="d-flex align-items-end justify-content-around">
										
										
										<label style={{color:"#000000", fontWeight:"700", marginLeft:"40px"}}> Order Type: {orderSourceType} </label>
										<label style={{color:"#000000", fontWeight:"700", marginLeft:"40px"}}> Payment: {editOrder.order?.payments[0].paymentMode} </label> 
										
									</div>
								</div>
								<div className="col-3 d-inline-flex justify-content-center align-items-center">
									<button type="submit" className="btn-admin save-purchase-invoice">
										Submit
									</button>
								</div>									
							</div>
						</form>					
						
						
						{prodBatchesDialogDisp && <ProductBatchesDialog setProdBatchesDialogDisp={setProdBatchesDialogDisp}  setSelectedBatch={setSelectedBatch} 
													setSelectedBatchToggle={setSelectedBatchToggle} selectedBatchToggle={selectedBatchToggle} selKey={selKey}  
													searchProductResult={searchProductResult} setSearchProductResult={setSearchProductResult}/>	}				
											
					
						
						
						
					</div>	
					
				</div>				
		</div>	 
	
	</>	
	
)}


export default ComponentEditOrder;