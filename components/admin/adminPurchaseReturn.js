import React from "react";
import { useEffect, useState } from "react";
import ProductBatchesDialog from "./adminProductBatchesDialog";
import AdminButtonProductsSold from "./adminButtonProductsSold"
import * as APIs from "./../../util/springAPIs";

const ComponentPurchaseReturn = () => {

	const [editPurchase, setEditPurchase] = useState("");
	const [editPurchaseId, setEditPurchaseId] = useState("");
	const [editPurchaseFetched, setEditPurchaseFetched] = useState(false);

	const [invoiceDate, setInvoiceDate] = useState("");
	const [supplierName, setSupplierName] = useState("");
	
	const [invoiceProductsList, setInvoiceProductsList] = useState([]);	
	const [quantity, setQuantity] = useState([]);
	const [sellingPrice, setSellingPrice] = useState([]);
	const [subTotal, setSubTotal] = useState(0);	
	const [returnPaymentSelect, setReturnPaymentSelect] = useState(0);
	const [paymentsData, setPaymentsData] = useState([]);
		
	
 	useEffect( () => {	

		if(editPurchase.length > 0) {
			setSupplierName(editPurchase[0].purchaseInvoice.supplier.supplierName)	
			
			let dd = editPurchase[0].purchaseInvoice.dateCreated.substring(8);
			let mm = editPurchase[0].purchaseInvoice.dateCreated.substring(5,7);
			let yyyy = editPurchase[0].purchaseInvoice.dateCreated.substring(0,4);

			setInvoiceDate(dd + ' / ' + mm + ' / ' + yyyy);
		}		
	},[editPurchase])	

	
	useEffect( () => {	
		if(editPurchase.length >0) {
			
			let editPurchaseTemp =  JSON.parse(JSON.stringify(editPurchase));
			
			for(let x in editPurchase) {  //this code deducts the quantities from batches of first json array element (which is purchase entry) if there are any previous return entries on this purchase invoice.
				
				if(x == 0) {
					for(let x_batches in editPurchase[x].batches) {
						for(let y in editPurchase){
							if(y > 0) {	
								for(let z in editPurchase[y].batches) {					
									if(editPurchase[x].batches[x_batches].batchProductName == editPurchase[y].batches[z].batchProductName) {	
										
										editPurchaseTemp[x].batches[x_batches].quantity = editPurchaseTemp[x].batches[x_batches].quantity - editPurchase[y].batches[z].quantity;
									}					
								}
							}
						}
						
					}	
				}	
			} 
			
			setEditPurchase(editPurchaseTemp);
		}	
	},[editPurchaseFetched])
	
	
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
	
	
	const handlePurchaseIdSubmit = (e) => {
		
		e.preventDefault();	
		if (editPurchaseId) {

		//	const fetchPurchaseReturnUrl = "http://localhost:8083/api/purchase-invoice-and-return/" + editPurchaseId; 	
			
			const fetchPurchaseReturnUrl = APIs.fetchPurchaseReturnUrl + editPurchaseId;
			
			const fetchPurchaseData = async () => {
				try {
					const response = await fetch(fetchPurchaseReturnUrl);
					const json = await response.json();
					console.log("purchase json")
					console.log(json)
					setEditPurchase(json);
					setEditPurchaseFetched(!editPurchaseFetched);		
				} 
				catch (error) {
					alert("From adminEditPurchase: fetching purchase details, Server-side error. Please try later.")
				}			
			}			
			fetchPurchaseData();	
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
				invoiceEntry.batchPurchaseInvoiceId = editPurchaseId;
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
	
	for(let x in editPurchase) {			
		if(x == 0) {
			for(let x_batches in editPurchase[x].batches) {
				buttonProductsSoldList.push(<AdminButtonProductsSold dto={editPurchase[x].batches[x_batches]}  handleSelectedProduct={handleSelectedProduct} />);
			}	
		}
	}		 

	const handleInvoiceSubmit = (e) => {
		
		e.preventDefault();
		
		const confirmSubmit = confirm("Are you sure that you want to submit the purchase return?");
		
		if(confirmSubmit == true) {
		
			const executeReturn = () => {
				
				const purchaseJSON = {};
				const customerJSON = {};

				purchaseJSON.purReturnId = editPurchase[0].purchaseInvoice.purchaseInvoiceId;
				purchaseJSON.supplier = editPurchase[0].purchaseInvoice.supplier;
				purchaseJSON.amount = subTotal;
				
				const batchesPurchaseEntryJSON = [];
				for(let x in invoiceProductsList) {
					const tempBatchesPurchaseEntryJSON = {};
					
					tempBatchesPurchaseEntryJSON.batchPurchaseInvoiceId = editPurchase[0].purchaseInvoice.purchaseInvoiceId;
					tempBatchesPurchaseEntryJSON.batchProductId = invoiceProductsList[x].productId;
					tempBatchesPurchaseEntryJSON.batchProductName = invoiceProductsList[x].productName;
					tempBatchesPurchaseEntryJSON.batchProductBrand = invoiceProductsList[x].productBrand;
					tempBatchesPurchaseEntryJSON.batchProductSku = invoiceProductsList[x].productSku;
					tempBatchesPurchaseEntryJSON.batchNo = invoiceProductsList[x].batch;
					tempBatchesPurchaseEntryJSON.batchPurSaleBool = 0;
					tempBatchesPurchaseEntryJSON.quantity = quantity[x]
					tempBatchesPurchaseEntryJSON.batchPurchasePrice = invoiceProductsList[x].batchPurchasePrice;
					tempBatchesPurchaseEntryJSON.ppIncludesGST = invoiceProductsList[x].ppIncludesGST;
					tempBatchesPurchaseEntryJSON.mrp = invoiceProductsList[x].mrp;
					tempBatchesPurchaseEntryJSON.sellingPrice = sellingPrice[x];
					tempBatchesPurchaseEntryJSON.expiryDate = invoiceProductsList[x].expiryDate;
					
					batchesPurchaseEntryJSON.push(tempBatchesPurchaseEntryJSON);	
				}
				
				const dto = {					
					purchaseInvoice: purchaseJSON,
					batches: batchesPurchaseEntryJSON
				}
				
				const requestOptionsPurchaseReturn = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dto)
				};
				
			//	const purchaseReturnUrl = "http://localhost:8083/api/create-purchase-return" 
				
				const purchaseReturnUrl = APIs.purchaseReturnUrl;
				
				const savePurchaseReturn = async () => {
					try {
						const response = await fetch(purchaseReturnUrl, requestOptionsPurchaseReturn);
					//	const jsonPurchaseInvoice = await response.json();

						if(!response.ok) {
							alert("HTTP error.")
						}
						else {

							const tempEditPurchase = JSON.parse(JSON.stringify(editPurchase));
							
							for(let a in invoiceProductsList) {		
								for (let x in tempEditPurchase) {			
								if(x == 0) {				
									for(let y in tempEditPurchase[x].batches) {
											if(tempEditPurchase[x].batches[y].batchProductId == invoiceProductsList[a].productId) {						
												tempEditPurchase[x].batches[y].quantity =  tempEditPurchase[x].batches[y].quantity - quantity[a];						
											}
										}		
									}				
								}		
							}
							setEditPurchase(tempEditPurchase)	
							setInvoiceProductsList([]);
							setQuantity([]);						
							
							alert("Purchase Return Updated Successfully.")
							
						}	
					} 
					catch (error) {
						alert("From adminUpdatePurchase: updating order, HTTP/ Network error. Please try later.")
					}			
				}			
				savePurchaseReturn(); 	
			}
			
			if(	invoiceProductsList.length >0) {
				
				//check data sanity, whether all entries in table are done.
				if( 				
					quantity.every((element)=> element) &&			
					invoiceProductsList.length == quantity.length 
				) {
					for(let a in invoiceProductsList) {		
						for (let x in editPurchase) {			
						if(x == 0) {				
							for(let y in editPurchase[x].batches) {
									if(editPurchase[x].batches[y].batchProductId == invoiceProductsList[a].productId) {	
										if(editPurchase[x].batches[y].quantity < quantity[a]) {
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
							 <form className="d-flex flex-column mx-4 my-4" onSubmit={handlePurchaseIdSubmit}>				
									<input type="text" className=" form-control mb-3" value={editPurchaseId} placeholder="Purchase Id" onChange={(e) => setEditPurchaseId(e.target.value)}  />

									<button className="btn-admin w-100" type="submit">
										Enter Purchase Id
									</button>				
							</form> 
						</div>
						<div className="">
							{buttonProductsSoldList}
						</div> 
						
						
					</div>
						
					<div className="col-9 mt-20" style={{borderLeft: "3px solid"}}>
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
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Supplier Name</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center" }}>Invoice Date</th> 
												<th scope="col" className="pl-4 " id="admin-table" style={{ textAlign: "center", width:"50px"  }}> Shipping Charges</th> 
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
					
				</div>				
		</div>	 
	
	</>	
	
)}


export default ComponentPurchaseReturn;