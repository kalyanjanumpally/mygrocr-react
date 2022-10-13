import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Pagination from "./adminPagination";
import * as APIs from "./../../util/springAPIs";

const ComponentReports = () => {
	
	const [reportType, setReportType] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [dtoOrders, setDtoOrders] = useState([]);
	const [dtoOrdersSearch, setDtoOrdersSearch] = useState([]);
	const [total, setTotal] = useState(0);
	const [search, setSearch] = useState("");
	const [searchActive, setSearchActive] = useState(false);
	const itemsListSearch = useRef([]);
	const [expiryStock, setExpiryStock] = useState([]);
	
	 //Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(30);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [pagination, setPagination] = useState([]);
	
	const showPagination = 10;	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
	
//	let getPaginatedProducts = [];
	let paginationGroup = [];

	const initiatePagination = (count, perPageItems) => {
		
		// set pagination
		let arr = new Array(Math.ceil(count / perPageItems))
			.fill()
			.map((_, idx) => idx + 1);  //   the underscore is just a placeholder for value which is not used in the function, you can put any name there.

		setPagination(arr);
		setPages(Math.ceil(count/ perPageItems));	
	}
	
	
	const tempTotal = 0;	
	const router = useRouter();
	

	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		setSearchActive(false);
		
		if( fromDate.length > 0 && toDate.length > 0 && (reportType=="order-wise" || reportType=="item-wise")) {
			
		//	const reportsOrdersListUrl = "http://localhost:8083/api/orders-batches-in-dates-range/" + fromDate + "/" + toDate; 
			
			const reportsOrdersListUrl = APIs.reportsOrdersListUrl + fromDate + "/" + toDate; 
			
			const fetchOrdersData = async () => {
				try {
					const response = await fetch(reportsOrdersListUrl);
					const json = await response.json();
					setDtoOrders(json);
					console.log("report- orders fetched:")
					console.log(json)
				//	if(startIndex == 0){
						initiatePagination(json.length, itemsPerPage);
				//	}
					} 
				catch (error) {
					alert("From adminReports: fetching orders, Server-side error. Please try later.")
				}			
			}			
			fetchOrdersData(); 
		}
		
		if( fromDate.length > 0 && toDate.length > 0 && reportType=="expiry-stock") {		
		//	const expiryStockListUrl = "http://localhost:8083/api/expiry-stock-in-dates-range/" + fromDate + "/" + toDate; 
			
			const expiryStockListUrl = APIs.expiryStockListUrl + fromDate + "/" + toDate; 
			
			const fetchExpiryStockData = async () => {
				try {
					const response = await fetch(expiryStockListUrl);
					const json = await response.json();
					setExpiryStock(json);
					console.log(json)
					} 
				catch (error) {
					alert("From adminReports: fetching orders, Server-side error. Please try later.")
				}			
			}			
			fetchExpiryStockData(); 
		}			
	}
	
	const handleDownloadReport = () => {
		
		if( fromDate.length > 0 && toDate.length > 0 && reportType == "order-wise") {		
		//	const ordersListDownloadUrl = "http://localhost:8083/api/orders-in-dates-range-download/" + fromDate + "/" + toDate; 
			
			const ordersListDownloadUrl = APIs.ordersListDownloadUrl + fromDate + "/" + toDate; 
	
			const fetchOrdersData = async () => {
				try {
					const response = await fetch(ordersListDownloadUrl);
					router.push(response.url)					
				} 
				catch (error) {
					alert("From adminReports: fetching orders, Server-side error. Please try later.")
				}			
			}			
			fetchOrdersData(); 
		}

		if( fromDate.length > 0 && toDate.length > 0 && reportType == "item-wise") {		
		//	const itemsListDownloadUrl = "http://localhost:8083/api/products-in-dates-range-download/" + fromDate + "/" + toDate; 
	
			const itemsListDownloadUrl = APIs.itemsListDownloadUrl + fromDate + "/" + toDate; 
	
			const fetchItemsData = async () => {
				try {
					const response = await fetch(itemsListDownloadUrl);
					router.push(response.url)					
				} 
				catch (error) {
					alert("From adminReports: fetching items, Server-side error. Please try later.")
				}			
			}			
			fetchItemsData(); 
		}		
	}
	
	
	// Pagination Code Begins...................................................................	

	let paginatedOrders = dtoOrders.slice(startIndex, endIndex);
	paginationGroup = pagination.slice(start, end);	

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);	
    };

    const selectChange = (newItemsPerPage) => {
        setItemsPerPage(Number(newItemsPerPage));
        setCurrentPage(1);
		
		if(Object.keys(dtoOrders).length > 0 && reportType == "order-wise" && searchActive == false) {
			setPages(Math.ceil(dtoOrders.length / Number(newItemsPerPage))); 
			initiatePagination(dtoOrders.length, newItemsPerPage);
		} 
		else if(Object.keys(dtoOrders).length > 0 && reportType == "item-wise" && searchActive==false){
			setPages(Math.ceil(itemsList.size / Number(newItemsPerPage))); 
			initiatePagination(itemsList.size, newItemsPerPage);
		}
    };  
	
	// Pagination Code Ends...................................................................
	
		
	const ordersTableData = [];
	
	
	if(Object.keys(dtoOrders).length > 0 && reportType == "order-wise" && searchActive == false) {
		
		const deliveryDate = new Date();
		
		for( let x in dtoOrders) {
			
			if(dtoOrders[x].order.orderDeliveryStatus == "Delivered" || dtoOrders[x].order.orderDeliveryStatus == "Completed") {
				tempTotal = tempTotal + dtoOrders[x].order.subTotal +  dtoOrders[x].order.shippingCharges;
			}
			else { //the entry is of sales return
				tempTotal = tempTotal - dtoOrders[x].order.subTotal -  dtoOrders[x].order.shippingCharges;
			} 
		}
		
		
		for( let x in paginatedOrders) {

				deliveryDate.setTime(Date.parse(paginatedOrders[x].order.dateDelivered));
			
			ordersTableData.push(	
				<tr style={ paginatedOrders[x].order.orderDeliveryStatus != "Sales Return" ? {color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"} : {color:"#000000", backgroundColor:"#fa6", fontSize:"16px"} }> 	
					<td id="admin-table-white-border"> { paginatedOrders[x].order.orderId } </td>
					<td id="admin-table-white-border"> 
						{paginatedOrders[x].order.dateDelivered.substring(8) + "-" + paginatedOrders[x].order.dateDelivered.substring(5,7) + "-" + paginatedOrders[x].order.dateDelivered.substring(0,4)}
					</td>
					<td id="admin-table-white-border"> { paginatedOrders[x].order.customer.fullName } </td>
					<td id="admin-table-white-border" style={{ textAlign: "center" }}> { paginatedOrders[x].order.orderSourceType } </td>
					<td id="admin-table-white-border"> { paginatedOrders[x].order.subTotal +  paginatedOrders[x].order.shippingCharges } </td>
					 
					{ paginatedOrders[x].order.orderDeliveryStatus == "Sales Return" &&
					<td id="admin-table-white-border"> Return- { paginatedOrders[x].order.salesReturnId } </td>  }
					
					{ paginatedOrders[x].order.orderDeliveryStatus != "Sales Return" &&
					<td id="admin-table-white-border"> { paginatedOrders[x].order.orderDeliveryStatus } </td>  }
										
					<td id="admin-table-white-border"> { paginatedOrders[x].order.orderPaymentStatus } </td>
				
				</tr> 	
			)
		} 
	} 
	
	const itemsTableData = [];
	const itemsList = new Map();
	
	if(Object.keys(dtoOrders).length > 0 && reportType == "item-wise" && searchActive==false) { 

		for( let x in dtoOrders) {	
			for( let y in dtoOrders[x].batches) {
				
				if(itemsList.has(dtoOrders[x].batches[y].batchProductName)) {
					
					if(dtoOrders[x].order.orderDeliveryStatus == "Delivered" || dtoOrders[x].order.orderDeliveryStatus == "Completed") {
					
						let tempArray = [ dtoOrders[x].batches[y].batchProductBrand, itemsList.get(dtoOrders[x].batches[y].batchProductName)[1] + dtoOrders[x].batches[y].quantity,
										  itemsList.get(dtoOrders[x].batches[y].batchProductName)[2] + dtoOrders[x].batches[y].quantity * dtoOrders[x].batches[y].mrp ];
						
						itemsList.set(dtoOrders[x].batches[y].batchProductName , tempArray);
					}
					else if(dtoOrders[x].order.orderDeliveryStatus == "Sales Return") {
						let tempArray = [dtoOrders[x].batches[y].batchProductBrand, itemsList.get(dtoOrders[x].batches[y].batchProductName)[1] - dtoOrders[x].batches[y].quantity,
										  itemsList.get(dtoOrders[x].batches[y].batchProductName)[2] - dtoOrders[x].batches[y].quantity * dtoOrders[x].batches[y].mrp ];
						
						itemsList.set(dtoOrders[x].batches[y].batchProductName , tempArray);					
					}
				}
				else {
					
					if(dtoOrders[x].order.orderDeliveryStatus == "Delivered" || dtoOrders[x].order.orderDeliveryStatus == "Completed") {
						let tempArray = [dtoOrders[x].batches[y].batchProductBrand, dtoOrders[x].batches[y].quantity,
										  dtoOrders[x].batches[y].quantity * dtoOrders[x].batches[y].mrp ];
						
						itemsList.set(dtoOrders[x].batches[y].batchProductName , tempArray);
					}
					else if(dtoOrders[x].order.orderDeliveryStatus == "Sales Return") {
						let tempArray = [dtoOrders[x].batches[y].batchProductBrand, dtoOrders[x].batches[y].quantity * (-1),
										  dtoOrders[x].batches[y].quantity * dtoOrders[x].batches[y].mrp * (-1) ];
						
						itemsList.set(dtoOrders[x].batches[y].batchProductName , tempArray);	
					}
				}				
			}
		}
		
		const tempItemsListSearch = [];	
		itemsList.forEach((array, productName) => {
		
			if(array[1] > 0) {
				const tempItemsListObject = {};
				tempItemsListObject.productName = productName;
				tempItemsListObject.brandName = array[0];
				tempItemsListObject.quantity = array[1];
				tempItemsListObject.total = array[2];
				
				tempItemsListSearch.push(tempItemsListObject);
			}	
		})	
		
		itemsListSearch.current = tempItemsListSearch;
		
	//	let paginatedItemsList = itemsList.slice(startIndex, endIndex);	

		itemsList.forEach( (array, productName) => {
			tempTotal = tempTotal + array[2];
		})

		let arrayItemsList = Array.from(itemsList).slice(startIndex, endIndex);
		let paginatedItemsList = new Map(arrayItemsList);

		paginatedItemsList.forEach( (array, productName) => {

		//	tempTotal = tempTotal + array[2];
			if(array[1] != 0) {
				itemsTableData.push(
					<tr style={{color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"}}>
						<td id="admin-table-white-border"> { productName } </td>
						<td id="admin-table-white-border"> { array[0] } </td>
						<td id="admin-table-white-border"> 
							{array[1]}
						</td>
						<td id="admin-table-white-border"> {Math.round(array[2] / array[1])} </td>	
						<td id="admin-table-white-border"> {array[2]} </td>
					</tr>	
				)
			}
		})			
	}
	
	
	
	if(Object.keys(dtoOrders).length > 0 && reportType == "order-wise" && searchActive==true) {
		
		var searchedOrders = [];
		var searchedOrdersTableData = [];
		// Tokenize the search terms and remove empty spaces
		var tokens = search
					  .toLowerCase()
					  .split(' ')
					  .filter((token) => {
							return token.trim() !== '';
					  });	  
					  
	    if(tokens.length) {
			//  Create a regular expression of all the search terms
			var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
	
			searchedOrders = dtoOrdersSearch.filter((order) => {
			  // Create a string of all object values
			  var orderString = '';
			  for(var key in order) {
				if(order.hasOwnProperty(key) && order[key] !== '' && order[key] != null) {
				  orderString += order[key].toString().toLowerCase().trim() + ' ';
				}
			  }
			  // Return book objects where a match with the search regex if found
			  return orderString.match(searchTermRegex);
			});	
	    }
		
		for(let x in searchedOrders) {
			searchedOrdersTableData.push(	
				<tr style={ searchedOrders[x].orderDeliveryStatus != "Sales Return" ? {color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"} : {color:"#000000", backgroundColor:"#fa6", fontSize:"16px"} }> 	
					<td id="admin-table-white-border"> { searchedOrders[x].orderId } </td>
					<td id="admin-table-white-border"> 
		
						{searchedOrders[x].dateDelivered.substring(8) + "-" + searchedOrders[x].dateDelivered.substring(5,7) + "-" + searchedOrders[x].dateDelivered.substring(0,4)}
					
					</td>
					<td id="admin-table-white-border"> { searchedOrders[x].customer.fullName } </td>
					<td id="admin-table-white-border" style={{ textAlign: "center" }}> { searchedOrders[x].orderSourceType } </td>
					<td id="admin-table-white-border"> { searchedOrders[x].subTotal +  searchedOrders[x].shippingCharges } </td>
					 
					{searchedOrders[x].orderDeliveryStatus == "Sales Return" &&
					<td id="admin-table-white-border"> Return- { searchedOrders[x].salesReturnId } </td>  }
					
					{ searchedOrders[x].orderDeliveryStatus != "Sales Return" &&
					<td id="admin-table-white-border"> { searchedOrders[x].orderDeliveryStatus } </td>  }
										
					<td id="admin-table-white-border"> { searchedOrders[x].orderPaymentStatus } </td>
				
				</tr> 	
			)
		}		
	}
	
	
			const searchedItemsTableData = [];
	
	if(Object.keys(dtoOrders).length > 0 && reportType == "item-wise" && searchActive==true) {
		
		var searchedItemsList = [];
		// Tokenize the search terms and remove empty spaces
		var tokens = search
					  .toLowerCase()
					  .split(' ')
					  .filter((token) => {
							return token.trim() !== '';
					  });
	    if(tokens.length) {
				//  Create a regular expression of all the search terms
				var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
			
			 searchedItemsList = itemsListSearch.current.filter((item) => {
			  // Create a string of all object values
			  var itemString = '';
			  for(var key in  item) {
				if(item.hasOwnProperty(key) && item[key] !== '') {
				  itemString += item[key].toString().toLowerCase().trim() + ' ';
				}
			  }
			  // Return book objects where a match with the search regex if found
			  return itemString.match(searchTermRegex);
			 });		
		}
			
		for(let x in searchedItemsList) {

			tempTotal = tempTotal + searchedItemsList[x].total;
			
			searchedItemsTableData.push(	
				<tr style={{color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"}}>
					<td id="admin-table-white-border"> { searchedItemsList[x].productName } </td>
					<td id="admin-table-white-border"> { searchedItemsList[x].brandName } </td>
					<td id="admin-table-white-border"> 
						{searchedItemsList[x].quantity}
					</td>
					<td id="admin-table-white-border"> {Math.round(searchedItemsList[x].total/ searchedItemsList[x].quantity)} </td>	
					<td id="admin-table-white-border"> {searchedItemsList[x].total} </td>
				</tr>	
			)
		}	
	}	
	
	
	const expiryStockTableData = [];
	
	if(Object.keys(expiryStock).length > 0 && reportType == "expiry-stock") {
		
		for( let x in expiryStock) {
			 
			expiryStockTableData.push(	
				<tr style={{color:"#ffffff", backgroundColor:"#1BBC9B", fontSize:"16px"}}> 	
				
					<td id="admin-table-white-border"> { expiryStock[x].productName } </td>
					<td id="admin-table-white-border"> { expiryStock[x].brandName } </td>
					<td id="admin-table-white-border"> 
						{expiryStock[x].batchNo.substring(8) + "-" + expiryStock[x].batchNo.substring(5,7) + "-" + expiryStock[x].batchNo.substring(0,4)}
					</td>
					<td id="admin-table-white-border"> 
						{expiryStock[x].expiryDate.substring(8) + "-" + expiryStock[x].expiryDate.substring(5,7) + "-" + expiryStock[x].expiryDate.substring(0,4)}					
					</td>
					
					<td id="admin-table-white-border" style={{ textAlign: "center" }}> { expiryStock[x].quantity } </td>
									
				</tr> 	
			)
		} 		
	}
	
	
	const handleSearchSubmit = (e) => {

		e.preventDefault();		
		setSearch(e.target.value)
		
		if(e.target.value.length > 0) {
			setSearchActive(true);
		}
		else {
			setSearchActive(false);
		}
		
		const dtoOrdersSearchTemp = [];
			
		for(let x in dtoOrders) {
			dtoOrders[x].order.fullName = dtoOrders[x].order.customer.fullName;
			dtoOrdersSearchTemp.push(dtoOrders[x].order);		
		}	
		setDtoOrdersSearch(dtoOrdersSearchTemp);	
	}	
	

	
return(	
	
<>

	<div className="row">
		<div className="col-12 mt-20 ">
			<form  onSubmit={handleSubmit}>
				<div className="d-flex justify-content-around align-items-center" style={{display:"block", backgroundColor:"#5E72E3", height:"50px", color:"#FFFFFF"}}>
					<select className="ml-170" style={{height:"30px", fontSize:"13px"}}  value={reportType} onChange={(e) => setReportType(e.target.value)}>
						<option value="" selected disabled hidden> Report Type </option>
						<option  value="order-wise"> Order Wise </option>
						<option  value="item-wise"> Item Wise </option>
						<option  value="expiry-stock"> Expiry Stock </option>
					</select>
					
					<div className="d-inline-flex">
						<label className="mr-10"> From: </label>
						<input className="" style={{height:"25px", borderRadius:"0px", fontSize:"13px", backgroundColor:"#ffffff"}}  type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
					</div>
					
					<div className="d-inline-flex">
						<label className="mr-10"> To: </label>
						<input style={{height:"25px", borderRadius:"0px", fontSize:"13px", backgroundColor:"#ffffff"}}  type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}/>
					</div>
					
					<button className="admin-reports-button mr-170" style={{height:"30px", fontSize:"14px"}} type="submit"> Display </button>	
				</div>
			</form>
		</div>
	</div>	
		
	<hr className="mb-0"/>
	
	<div className="row" style={{ height:"60px"}}>		
		<div className="col-12 d-flex justify-content-between align-items-center">
		
			<label className="ml-30" style={{color:"#000000", fontSize:"20px", fontWeight:"700"}}> Total Sales: Rs. {tempTotal}   </label>	
			
				<input type="text" className="" style={{width:"300px", height:"35px", borderRadius:"1px", border:"1px solid #000000"}} value={search} placeholder="search" 
				onChange={handleSearchSubmit} />
			
			<button className="mr-30 btn-admin-report" type="button" onClick={handleDownloadReport}> Export Report </button>			
			
		</div>	
	</div>
	
	<div className="row">	
			
		{ (reportType == "order-wise") && 
		<>	
			<div>
				<nav aria-label="Page navigation example">
			
					<Pagination
					paginationGroup={
						paginationGroup
					}
					currentPage={currentPage}
					pages={pages}
					next={next}
					prev={prev}
					handleActive={handleActive}
					selectChange={selectChange}
					/>  
				</nav>		
			</div>
		
			<table className="table mt-20" style={{tableLayout:"fixed"}}>
				<thead style={{
						border: "1px solid #000000",	
						position: "sticky",
						top: 0,																	
						right: 0,
						fontWeight:"500",
						fontSize:"16px",
						color: "#ffffff",
						backgroundColor: "#2E3D50"}}> 
					<tr>
						<th id="admin-table-white-border" style={{ width:"70px" }}> Order Id </th>  
						<th id="admin-table-white-border" style={{ width:"120px"}}> Delivery/ Return Date </th>	
						<th id="admin-table-white-border" style={{ width:"200px" }}> Customer </th>						
						<th id="admin-table-white-border" style={{  width:"120px" }}> Source </th> 
						<th id="admin-table-white-border" style={{  width:"100px" }}> Total </th> 
						<th id="admin-table-white-border" style={{  width:"120px" }}> Delivery Status </th> 						
						<th id="admin-table-white-border" style={{  width:"120px"}}> Payment </th> 
					</tr>
				</thead>
						
				<tbody>
					{(searchActive == false) && ordersTableData}
					
					{(searchActive == true) && searchedOrdersTableData}
				</tbody>
			</table>
		</>}
		
		{ (reportType == "item-wise") && 
		<>	
			<div>
				<nav aria-label="Page navigation example">
			
					<Pagination
					paginationGroup={paginationGroup}
					currentPage={currentPage}
					pages={pages}
					next={next}
					prev={prev}
					handleActive={handleActive}
					selectChange={selectChange}
					/>  
				</nav>		
			</div>
		
			<div className="row">
				<div className="col-1">
				</div>
				<div className = "col-10">
					<table className="table mt-20" style={{tableLayout:"fixed"}}>
						<thead style={{
								border: "1px solid #000000",	
								position: "sticky",
								top: 0,																	
								right: 0,
								fontWeight:"500",
								fontSize:"16px",
								color: "#ffffff",
								backgroundColor: "#2E3D50"}}> 
							<tr>
								<th id="admin-table-white-border" style={{ width:"120px" }}> Product </th> 
								<th id="admin-table-white-border" style={{ width:"120px" }}> Brand </th> 
								<th id="admin-table-white-border" style={{ width:"60px"}}> Quantity </th>	
								<th id="admin-table-white-border" style={{ width:"60px" }}> Average MRP </th>						
								<th id="admin-table-white-border" style={{ width:"60px" }}> Total </th> 
							</tr>
						</thead>
								
						<tbody>
							{(searchActive == false) && itemsTableData}
							
							{(searchActive == true) && searchedItemsTableData}
							
						</tbody>
					</table>
				</div>	
			</div>
		</>}



		{ (reportType == "expiry-stock") && 
		<>	
			<div className="row">
				<div className="col-1">
				</div>
				<div className = "col-10">
					<table className="table mt-20" style={{tableLayout:"fixed"}}>
						<thead style={{
								border: "1px solid #000000",	
								position: "sticky",
								top: 0,																	
								right: 0,
								fontWeight:"500",
								fontSize:"16px",
								color: "#ffffff",
								backgroundColor: "#2E3D50"}}> 
							<tr>
								<th id="admin-table-white-border" style={{ width:"120px" }}> Product </th> 
								<th id="admin-table-white-border" style={{ width:"120px" }}> Brand </th> 
								<th id="admin-table-white-border" style={{ width:"60px"}}> Batch No. </th>	
								<th id="admin-table-white-border" style={{ width:"60px" }}> Expiry Date </th>						
								<th id="admin-table-white-border" style={{ width:"60px" }}> Quantity </th> 
							</tr>
						</thead>
								
						<tbody>
							
							{expiryStockTableData}
							
						</tbody>
					</table>
				</div>	
			</div>
		</>}	


		
		
	</div>

</>
	
	
)}

export default ComponentReports;