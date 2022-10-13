import React from "react";
import { useEffect, useState } from "react";
import ProductBatchesDialog from "./adminProductBatchesDialog";
import AdminButtonProductsSold from "./adminButtonProductsSold"
import CustomerPaymentsDialog from "./adminCustomerPaymentsDialog";
import * as APIs from "./../../util/springAPIs";


const ComponentManageSalesReturns = () => {

	const [editOrder, setEditOrder] = useState("");
	const [editOrderId, setEditOrderId] = useState("");
	const [editOrderFetched, setEditOrderFetched] = useState(false);

	const [invoiceDate, setInvoiceDate] = useState(new Date());
	const [customerName, setCustomerName] = useState("");
	
	const [invoiceProductsList, setInvoiceProductsList] = useState([]);	
	const [quantity, setQuantity] = useState([]);
	const [sellingPrice, setSellingPrice] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [orderSourceType, setOrderSourceType] = useState("");	
	const [returnPaymentSelect, setReturnPaymentSelect] = useState(0);
	const [orderPaymentDisp, setOrderPaymentDisp] = useState(false);
	const [paymentsData, setPaymentsData] = useState([]);

	const orderCreationDate = new Date();
	
 	useEffect( () => {	

		if(editOrder.length > 0) {
			setCustomerName(editOrder[0].order.customer.fullName)
			setOrderSourceType(editOrder[0].order.orderSourceType);	
						
			orderCreationDate.setTime(Date.parse(editOrder[0].order.dateTimeCreated));
			
		//	let dd = editOrder[0].order.dateCreated.substring(8);
		//	let mm = editOrder[0].order.dateCreated.substring(5,7);
		//	let yyyy = editOrder[0].order.dateCreated.substring(0,4);

			setInvoiceDate(orderCreationDate);
		}		
	},[editOrder])	

	
	useEffect( () => {	
		if(editOrder.length >0) {
			
			let editOrderTemp =  JSON.parse(JSON.stringify(editOrder));
			
			for(let x in editOrder) {
				
				if(x == 0) {
					for(let x_batches in editOrder[x].batches) {
						for(let y in editOrder){
							if(y > 0) {	
								for(let z in editOrder[y].batches) {					
									if(editOrder[x].batches[x_batches].batchProductName == editOrder[y].batches[z].batchProductName) {	
										
										editOrderTemp[x].batches[x_batches].quantity = editOrderTemp[x].batches[x_batches].quantity - editOrder[y].batches[z].quantity;
									}					
								}
							}
						}
						
					}	
				}	
			} 
			
			setEditOrder(editOrderTemp);
		}	
	},[editOrderFetched])
	
	
	useEffect(() => {	

		const multiplyQuantityPriceArray = quantity.map((qty, key)=>{	
			
			if(qty) {
				return(qty * invoiceProductsList[key].sellingPrice)
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
		
	},[quantity])
	
	
	const handleOrderIdSubmit = (e) => {
		
		e.preventDefault();	
		if (editOrderId) {

		//	const fetchOrderSalesReturnUrl = "http://localhost:8083/api/order-sales-return/" + editOrderId; 
			const fetchOrderSalesReturnUrl = APIs.fetchOrderSalesReturnUrl + editOrderId; 
			
			const fetchOrderData = async () => {
				try {
					const response = await fetch(fetchOrderSalesReturnUrl);
					const json = await response.json();
					setEditOrder(json);
					setEditOrderFetched(!editOrderFetched);		
				} 
				catch (error) {
					alert("From adminEditOrder: fetching order, Server-side error. Please try later.")
				}			
			}			
			fetchOrderData();	
		}			
	}

	
	 
	const handleSelectedProduct = (dto) => {
		
		const repeatProductCheck = 0;
		
		for(let x in invoiceProductsList) {		
			if(invoiceProductsList[x].productId == dto.batchProductId) {
				repeatProductCheck = 1;
			}		
		}
			
		if(repeatProductCheck == 0) {				
			const tempInvoiceList = JSON.parse(JSON.stringify(invoiceProductsList));
			const tempQuantity = JSON.parse(JSON.stringify(quantity));
		//	const tempSellingPrice = JSON.parse(JSON.stringify(sellingPrice));			
				
				const invoiceEntry = {};
				invoiceEntry.batchId = dto.batchId;     
				invoiceEntry.batchOrderId = editOrderId;
				invoiceEntry.productId = dto.batchProductId;
				invoiceEntry.productName = dto.batchProductName;
				invoiceEntry.productBrand = dto.batchProductBrand;
				invoiceEntry.productSku = dto.batchProductSku;
				invoiceEntry.batch = dto.batchNo;
				invoiceEntry.mrp = dto.mrp;	
				invoiceEntry.expiryDate = dto.expiryDate;
				invoiceEntry.batchPurchasePrice = dto.batchPurchasePrice;
				invoiceEntry.ppIncludesGST = dto.ppIncludesGST;
				invoiceEntry.sellingPrice = dto.sellingPrice;
				tempInvoiceList.push(invoiceEntry);	
				tempQuantity.push(dto.quantity);
			//	tempSellingPrice.push(dto.sellingPrice);				
				
			setInvoiceProductsList(tempInvoiceList);
			setQuantity(tempQuantity);
		//	setSellingPrice(tempSellingPrice);
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
	

	const buttonProductsSoldList = [];
	
	for(let x in editOrder) {			
		if(x == 0) {
			for(let x_batches in editOrder[x].batches) {	
				buttonProductsSoldList.push(<AdminButtonProductsSold dto={editOrder[x].batches[x_batches]}  handleSelectedProduct={handleSelectedProduct} />);
			}	
		}
	}		 

	const handleReturnPayment = (e) => {
		
		setReturnPaymentSelect(e.target.value)	
		
		if(e.target.value == 1) {
			  
			let tempPaymentsData = [];
			let tempPaymentsDataEntry = {};
			tempPaymentsDataEntry.amount = subTotal;
			tempPaymentsDataEntry.paymentMode = "Return On Credit";
			tempPaymentsData.push(tempPaymentsDataEntry);	
						
			setPaymentsData(tempPaymentsData);
			
		}
		else if(e.target.value == 2) {
			setOrderPaymentDisp(true);
		}	
		
	}


	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();
	
		const confirmSubmit = confirm("Are you sure that you want to submit the return order?");
		
		if(confirmSubmit == true) {
		
			const executeReturn = () => {
				
				const orderJSON = {};
				const customerJSON = {};

				orderJSON.salesReturnId = editOrderId;
				orderJSON.customer = editOrder[0].order.customer;
				orderJSON.subTotal = subTotal;
				orderJSON.payments = paymentsData;
				
				const batchesOrdersEntryJSON = [];
				for(let x in invoiceProductsList) {
					const tempBatchesOrdersEntryJSON = {};
					
					tempBatchesOrdersEntryJSON.batchOrderId = editOrderId;
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
				
			//	const salesReturnUrl = "http://localhost:8083/api/create-sales-return" 
				const salesReturnUrl = APIs.salesReturnUrl;
				
				const saveSales = async () => {
					try {
						const response = await fetch(salesReturnUrl, requestOptionsSales);
					//	const jsonPurchaseInvoice = await response.json();

						if(!response.ok) {
							alert("HTTP error.")
						}
						else {

							const tempEditOrder = JSON.parse(JSON.stringify(editOrder));
							
							for(let a in invoiceProductsList) {		
								for (let x in tempEditOrder) {			
								if(x == 0) {				
									for(let y in tempEditOrder[x].batches) {
											if(tempEditOrder[x].batches[y].batchProductId == invoiceProductsList[a].productId) {						
												tempEditOrder[x].batches[y].quantity =  tempEditOrder[x].batches[y].quantity - quantity[a];						
											}
										}		
									}				
								}		
							}
							setEditOrder(tempEditOrder)	
							setInvoiceProductsList([]);
							setQuantity([]);
							setReturnPaymentSelect(0);
							setPaymentsData([]);						
							
							alert("Sales Return Updated Successfully.")
							
						}	
					} 
					catch (error) {
						alert("From adminUpdateOrder: updating order, HTTP/ Network error. Please try later.")
					}			
				}			
				saveSales(); 	
			}
			
			if(	invoiceProductsList.length >0) {
				
				//check data sanity, whether all entries in table are done.
				if( 				
					quantity.every((element)=> element) &&			
					invoiceProductsList.length == quantity.length &&
					paymentsData.length > 0
				) {
					for(let a in invoiceProductsList) {		
						for (let x in editOrder) {			
						if(x == 0) {				
							for(let y in editOrder[x].batches) {
									if(editOrder[x].batches[y].batchProductId == invoiceProductsList[a].productId) {	
										if(editOrder[x].batches[y].quantity < quantity[a]) {
											alert("Selected quantity higher than available quantity.")
										}
										else {
											executeReturn();
										}						
									}
								}		
							}				
						}		
					}
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
				  {/*	<input type="text" className=" px-0 " value={sellingPrice[key]} onChange={(e) => handleSellingPriceChange(e,key)}  /> */}
					  {prod.sellingPrice}
			  </td>
			  
			  <td scope="row"  className=" px-2 " id="admin-table">
			  	{prod.expiryDate.substring(8) + "-" + prod.expiryDate.substring(5,7) + "-" + prod.expiryDate.substring(0,4)} 
			  </td>  
			  
			  <td scope="row" className=" px-2 " id="admin-table"> 
				{ quantity[key] ? quantity[key] * prod.sellingPrice : 0 }
				</td>
				
			  <td scope="row" id="admin-table"> 					
					<a onClick={()=> deleteInvoiceEntry(key)}><img style={{width: "20px", height:"20px", border:"none"}} src="/assets/imgs/icons/file-x.svg"></img></a> 						
			  </td>				  
		  </tr>
		))
	} 
	
	
	
	
return(	

	<>
		 <div className="container">			
				<div className="row my-2">  
					<div className="col-3">
					
						<div>
							 <form className="d-flex flex-column mx-4 my-4" onSubmit={handleOrderIdSubmit}>				
									<input type="text" className=" form-control mb-3" value={editOrderId} style={{borderRadius:"0px"}} placeholder="Order Id" onChange={(e) => setEditOrderId(e.target.value)}  />

										{/*	<button className="btn-admin w-100" type="submit">
										Enter Order Id
										</button>		*/}		
							</form> 
						</div>
						<div className="">
							{buttonProductsSoldList}
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
													{/*<input value={shippingCharges} className="" onChange={(e)=>setShippingCharges(e.target.value)}/> */}
												</td> 
												<td scope="col" className="pl-4" id="admin-table" style={{ textAlign: "center" }}> 
													{subTotal }
												</td> 
											</tr>					   				
										</tbody>	
									</table>
									<div className ="d-flex justify-content-between align-items-end">
										
										
										<label style={{color:"#000000", fontWeight:"700", marginLeft:"40px"}}> Order Type: {orderSourceType} </label>
										<label style={{color:"#000000", fontWeight:"700", marginLeft:"40px"}}> Payment: {editOrder[0]?.order.payments[0].paymentMode} </label> 
										
										<select className="form-control ml-15" style={{width:"150px", border:"1px solid #000000", borderRadius:"0px"}} value={returnPaymentSelect}  onChange={handleReturnPayment}>
											<option value={0} selected disabled hidden> Payment Type </option>
											<option value={1}> Nill </option>
											<option value={2}> Return Payment </option>
										</select>
										
									</div>
								</div>
								<div className="col-3 d-inline-flex justify-content-center align-items-center">
									<button type="submit" className="btn-admin save-purchase-invoice">
										Submit
									</button>
								</div>									
							</div>
						</form>						
						
					</div>	
					
					
				{orderPaymentDisp && <CustomerPaymentsDialog total={subTotal} setOrderPaymentDisp={setOrderPaymentDisp} setPaymentsData={setPaymentsData} customerName={editOrder[0].order.customer.fullName}/>}

					
					
				</div>				
		</div>	 
	
	</>	
	
)}


export default ComponentManageSalesReturns;