import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import CustomerDialogBox from "./adminCustomerDialogBox";
import AdminButtonProduct from "./adminButtonProduct";
import ProductBatchesDialog from "./adminProductBatchesDialog"
import AddNewCustomer from "./adminAddNewCustomer";
import CustomerPaymentsDialog from "./adminCustomerPaymentsDialog";
import * as APIs from "./../../util/springAPIs";


const ComponentCreateOrder = () => {
	

	const [invoiceDate, setInvoiceDate] = useState("");
	const [dateJSON, setDateJSON] = useState("");
	
	const [searchProduct, setSearchProduct] = useState("");
	const [searchProductResult, setSearchProductResult] = useState("");
	const [searchProductToggle, setSearchProductToggle] = useState(false);
	
	const [selKey, setSelKey] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("");
	const [selectedBatchToggle, setSelectedBatchToggle] = useState(false);
	
	const [searchCustomer, setSearchCustomer] = useState("");
	const [searchCustomerResult, setSearchCustomerResult] = useState("");
	const [selectedCustomer, setSelectedCustomer] = useState("");
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
	const [comments, setComments] = useState("");
	const [orderPaymentDisp, setOrderPaymentDisp] = useState(false);
	const [orderPaymentSelect, setOrderPaymentSelect] = useState(0);
	const [paymentsData, setPaymentsData] = useState([]);
	
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);

	let startIndex = currentPage * itemsPerPage - itemsPerPage;
	
	 //Pagination related state variables for customers search..............
		
    const [itemsPerPageCustomer, setItemsPerPageCustomer] = useState(3);
//	const [newItemsPerPage, setNewItemsPerPage] = useState(3);
	const [currentPageCustomer, setCurrentPageCustomer] = useState(1);
	const [pagesCustomer, setPagesCustomer] = useState(1);
	const [paginationCustomer, setPaginationCustomer] = useState([]);
	
	const showPaginationCustomer = 10;	
	let startIndexCustomer = currentPageCustomer * itemsPerPageCustomer - itemsPerPageCustomer;
    let endIndexCustomer = startIndexCustomer + itemsPerPageCustomer;
    let startCustomer = Math.floor((currentPageCustomer - 1) / showPaginationCustomer) * showPaginationCustomer;
    let endCustomer = startCustomer + showPaginationCustomer;
	
//	let getPaginatedCustomers = [];
	let paginationGroupCustomer = [];
	
	const initiatePagination = (countOfCustomers) => {			
		// set pagination
		let arr = new Array(Math.ceil(countOfCustomers / itemsPerPageCustomer))
			.fill()
			.map((_, idx) => idx + 1);  //   the underscore is just a placeholder for value which is not used in the function, you can put any name there.

		setPaginationCustomer(arr);
		setPagesCustomer(Math.ceil(countOfCustomers/ itemsPerPageCustomer));	
	} 	
	
	useEffect(() => {
		
		let today = new Date();		
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

//		setInvoiceDate(dd + ' / ' + mm + ' / ' + yyyy);

		setInvoiceDate(dd + ' / ' + mm + ' / ' + yyyy);
		setDateJSON(yyyy + "-" + mm +"-" + dd);
	},[])
	
	
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
					invoiceEntry.productBrand = searchProductResult[selKey].product.brand.brandName;
					invoiceEntry.productSku = searchProductResult[selKey].product.sku;
					invoiceEntry.batch = selectedBatch;
							
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
				
		const paymentsDataTemp = [];
		for(let x in paymentsData){
			paymentsDataTemp[x] == ""
		}
		setPaymentsData(paymentsDataTemp);		
		
		setOrderSourceType("");
		setComments("")
		setOrderPaymentSelect(0)
		setShippingCharges(0);	
		setSearchCustomer("");
		setSelectedCustomer("");	
		setSearchProductResult("");
		setSearchProduct("");
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
							console.log(json)
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
	
	const handleCustomerSearchSubmit = (e) => {
		
		if (e.key === "Enter") {
            e.preventDefault();
			setCustSearchDisp(true);
			
		//	const searchCustomerUrl = "http://localhost:8083/api/search-customer/" + searchCustomer + "/" + itemsPerPageCustomer + "/" + startIndexCustomer;
			
			const searchCustomerUrl = APIs.searchCustomerUrl + searchCustomer + "/" + itemsPerPageCustomer + "/" + startIndexCustomer;			
            
			const searchCust = async () => {
				try {
						const response = await fetch(searchCustomerUrl);
						const json = await response.json();

						if(!response.ok) {
							alert("HTTP Error. Please try later.");
						}
						else
							setSearchCustomerResult(json.customers);
							if(startIndexCustomer == 0) {
								initiatePagination(json.countOfCustomers);
							}
				} 
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}			
			}			
			searchCust();				
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
	
	const handleOrderPayment =(e) => {
		
		setOrderPaymentSelect(e.target.value)	
		
		if(e.target.value == 1) {
			
			let tempPaymentsData = [];
			let tempPaymentsDataEntry = {};
			tempPaymentsDataEntry.amount = subTotal + parseInt(shippingCharges);
			tempPaymentsDataEntry.paymentMode = "Sale On Credit";
			tempPaymentsData.push(tempPaymentsDataEntry);	
						
			setPaymentsData(tempPaymentsData);
			
		}
		else if(e.target.value == 2) {
			setOrderPaymentDisp(true);
		}			
	}

	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();
		
		const confirmOrder = confirm("Are you sure that you want to submit the order?");
		
		if(confirmOrder = true) {
			if(	invoiceProductsList.length >0) {
				
				//check data sanity, whether all entries in table are done.
				if( 				
					quantity.every((element)=> element) &&
					sellingPrice.every((element)=> element) &&
					
					invoiceProductsList.length == quantity.length &&
					invoiceProductsList.length == sellingPrice.length &&

					selectedCustomer.customerId &&
					orderSourceType &&
					(orderPaymentSelect >0) 
					
				) {
					
					const orderJSON = {};
				 //	const customerJSON = {};
				 
					const paymentMade = 0;
					for(let x in paymentsData) {
						if(paymentsData[x].paymentMode != "Sale On Credit") {
							paymentMade = parseFloat(paymentMade) + parseFloat(paymentsData[x].amount);
						}	
					}
					
				//	orderJSON.dateCreated = dateJSON;
					orderJSON.subTotal = subTotal;
					orderJSON.shippingCharges = shippingCharges;
					orderJSON.customer = selectedCustomer;
					orderJSON.orderSourceType = orderSourceType;		
					orderJSON.orderDeliveryStatus = "Pending";    
				//	orderJSON.orderPaymentStatus = "Pending"; 
					orderJSON.comments = comments;
					orderJSON.payments = paymentsData;
					orderJSON.pendingPayment = parseFloat(subTotal) + parseFloat(shippingCharges) - parseFloat(paymentMade);
					
					const batchesOrdersEntryJSON = [];
					for(let x in invoiceProductsList) {
						const tempBatchesOrdersEntryJSON = {};
						
					//	tempBatchSalesEntryJSON.batchOrderId = 
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
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(dto)
					};
					
				//	const salesInvoiceSaveUrl = "http://localhost:8083/api/create-order" 
					
					const salesInvoiceSaveUrl = APIs.salesInvoiceSaveUrl;
					
					const saveSales = async () => {
						try {
							const response = await fetch(salesInvoiceSaveUrl, requestOptionsSales);
						//	const jsonPurchaseInvoice = await response.json();

							if(!response.ok) {
								alert("HTTP error.")
							}
							else {
								alert("Order Saved Successfully.")
								emptyForm();
								
							}	
						} 
						catch (error) {
							alert("From adminCreateOrder: saving order, HTTP/ Network error. Please try later.")
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
	
	// Pagination Code Begins for search customer...................................................................	

//	getPaginatedCustomers = customers.slice(startIndex, endIndex);
//	getPaginatedCustomers = customers;
	paginationGroupCustomer = paginationCustomer.slice(startCustomer, endCustomer);	

    const nextCustomer = () => {
        setCurrentPageCustomer((page) => page + 1);
    };

    const prevCustomer = () => {
        setCurrentPageCustomer((page) => page - 1);
    };

    const handleActiveCustomer = (item) => {
        setCurrentPageCustomer(item);		
    };

    const selectChangeCustomer = (newItemsPerPage) => {
		
        setItemsPerPageCustomer(Number(newItemsPerPage));
        setCurrentPageCustomer(1); 
    };  
	
	// Pagination Code Ends...................................................................
	
	
	
	
	
	
return(	
	<>
		 <div className="container">			
				<div className="row my-2">  
					<div className="col-3">
						<div>
							<form className="d-flex flex-column mx-4 my-4" onSubmit={handleProductSearchSubmit}>				
								<input type="text" className=" form-control " value={searchProduct} placeholder="Search Product" style={{borderRadius:"0px"}} onChange={handleProductSearchNameChange}  />
									{/*
								<button className="btn-admin w-100" type="submit">
									Search Product
									</button>		 */}		
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
							
							<div className="row mt-20">
								<div className="col-12 flex-column">
									<table className="table mt-20" >
										<thead>
											<tr> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Customer Name</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Invoice Date</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center", width:"50px"  }}> Shipping Charges</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}> Total </th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}> Payment </th> 
											</tr>									
										</thead>	
										<tbody>
											<tr id="admin-input-wrapper"> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
													<input placeholder="Search Customer"  value={searchCustomer} className="" onChange={(e)=>setSearchCustomer(e.target.value)} 
													onKeyDown={handleCustomerSearchSubmit}/>
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}>
														{invoiceDate}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center"}}> 
													<input value={shippingCharges} className="" onChange={(e)=>setShippingCharges(e.target.value)}/>
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}> 
													{subTotal + parseInt(shippingCharges)}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}> 
													{paymentsData[0]?.paymentMode} 
												</td> 
											</tr>					   				
										</tbody>	
									</table>
									
								</div>
								
								<div className="col-12 mt-20 mb-20 d-flex align-items-start justify-content-around">
								
										<button type="button" className="btn-admin ml-15 py-0" style={{width:"100px", height:"50px", fontSize:"15px", borderRadius:"0px"}} onClick={()=> setAddNewCustomerDisp(true)}>
											New Customer
										</button>
										
										<select className="form-control ml-15" style={{width:"120px", border:"1px solid #000000", borderRadius:"0px"}} value={orderSourceType}  onChange={(e) => setOrderSourceType(e.target.value)}>
											<option value="" selected disabled> Source Type </option>
											<option value="Phone"> Phone </option>
											<option value="Walk-in"> Walk-in </option>
										</select>
										
										<select className="form-control ml-15" style={{width:"150px", border:"1px solid #000000", borderRadius:"0px"}} value={orderPaymentSelect}  onChange={handleOrderPayment}>
											<option value={0} selected disabled hidden> Payment Type </option>
											<option value={1}> Sale On Credit </option>
											<option value={2}> Receive Payment </option>
										</select>
											
										<input className="form-control ml-15" style={{border:"1px solid #000000", width:"300px", borderRadius:"0px"}} type="textarea" placeholder="Comments" value={comments} onChange={(e)=> setComments(e.target.value)} />
										
										<button type="submit" className="btn-admin ml-15" style={{width:"100px", height:"50px", borderRadius:"0px" }}> Submit </button>		
										
								</div>							
							</div>
						</form>	
						
						{custSearchDisp && <CustomerDialogBox setCustSearchDisp={setCustSearchDisp} custSearchDisp={custSearchDisp} searchCustomerResult={searchCustomerResult} 
											setSearchCustomer={setSearchCustomer} setSelectedCustomer = {setSelectedCustomer} 
											paginationGroupCustomer={paginationGroupCustomer} currentPageCustomer={currentPageCustomer} pagesCustomer={pagesCustomer} 
											nextCustomer={nextCustomer} prevCustomer={prevCustomer} handleActiveCustomer={handleActiveCustomer} selectChangeCustomer={selectChangeCustomer}/> }
						
						
						{addNewCustomerDisp && <AddNewCustomer setAddNewCustomerDisp={setAddNewCustomerDisp}/>}					
						
						
						{prodBatchesDialogDisp && <ProductBatchesDialog setProdBatchesDialogDisp={setProdBatchesDialogDisp} setSelectedBatch={setSelectedBatch} 
													setSelectedBatchToggle={setSelectedBatchToggle} selectedBatchToggle={selectedBatchToggle} selKey={selKey} 
													searchProductResult={searchProductResult} setSearchProductResult={setSearchProductResult}/>	}				
											
					
						{orderPaymentDisp && <CustomerPaymentsDialog total={subTotal + parseInt(shippingCharges)} setOrderPaymentDisp={setOrderPaymentDisp} setPaymentsData={setPaymentsData}/>}
						
						
					</div>	
					
				</div>				
		</div>	 
	
	</>	
)}


export default ComponentCreateOrder;