import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//import { connect } from "react-redux";
//import { addAdminProductsToStore, deleteAdminProductFromStore, toggleProdDisplayStatusInStore, deleteCategoriesOfProductsInStore } from "./../../redux/action/adminProducts";
//import { addCategoriesToStore } from "./../../redux/action/categories";
import { findProductIndexById, findCategoryIndexById, deleteCategory } from "./../../util/util"
import CatDialogBox from "./adminCatDialogBox";
import catChainDeveloper from "./catChainDeveloper";
import { useRouter } from 'next/router';
import ProductInventoryDataDialog from "./adminProductInventoryDataDialog";
import BatchesDisplayDialog from "./adminBatchesDisplayDialog";
import StockUpdateDialog from "./adminStockUpdateDialog";
import Pagination from "./adminPagination";
import * as APIs from "./../../util/springAPIs";


const ComponentManageProducts = () => {

	const [checked, setChecked] = useState([]);
	const [showDelCategoryButton, setShowDelCategoryButton] = useState(0);
	const [dispCatDialog, setDispCatDialog] = useState([])
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [refresh, setRefresh] = useState(false);	
	const [inventoryDialogDisp, setInventoryDialogDisp] = useState(false);
	const [batchesDisplayDialogDisp, setBatchesDisplayDialogDisp] = useState(false);
	const [batchesDisplayProductInfo, setBatchesDisplayProductInfo] = useState("");
	const [productDeleteBool, setProductDeleteBool] = useState([]);
	const [stockUpdateDialogDisp, setStockUpdateDialogDisp] = useState(false);
	const [stockUpdateProductInfo, setStockUpdateProductInfo] = useState("");
	
	const [search, setSearch] = useState("");
	const [selectedType, setSelectedType] = useState("product");
	const [selectedStatus, setSelectedStatus] =useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("");
	const [allBrands, setAllBrands] = useState("");
	
	const [selectedProductId, setSelectedProductId] = useState("");
	
	const [allProductsBool, setAllProductsBool] = useState(true);
	const [searchProductsBool, setSearchProductsBool] = useState(true);
	
    //Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(30);
//	const [newItemsPerPage, setNewItemsPerPage] = useState(3);
	const [currentPage, setCurrentPage] = useState(1);
//	const currentPage = useRef(1);
	const [pages, setPages] = useState(1);
	const [pagination, setPagination] = useState([]);
	
	const showPagination = 10;	
	let startIndex = currentPage * itemsPerPage - itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
	
//	let getPaginatedProducts = [];
	let paginationGroup = [];
	
	const router = useRouter();
	
	const initiatePagination = (countOfProducts) => {
				
		// set pagination
		let arr = new Array(Math.ceil(countOfProducts / itemsPerPage))
			.fill()
			.map((_, idx) => idx + 1);  //   the underscore is just a placeholder for value which is not used in the function, you can put any name there.

		setPagination(arr);
		setPages(Math.ceil(countOfProducts/ itemsPerPage));	
	} 

	useEffect(() => {	

		const delay = () => {
		//	const prodUrl = "http://localhost:8083/api/products-and-batches/" + itemsPerPage + "/" + startIndex;
			
			const prodUrl = APIs.prodUrl + itemsPerPage + "/" + startIndex;
			
			const fetchData = async () => {
				try {
					const response = await fetch(prodUrl);
					const json = await response.json();
					
					setProducts(json.dtos)
					if(startIndex == 0){
						initiatePagination(json.countOfProducts);
					}
					
					let tempDelete = [];
					for( let x in json) {
						tempDelete.push(false);
					}
					setProductDeleteBool(tempDelete);
					} 
				catch (error) {
					alert("From adminViewProducts: Cannot fetch products. Server-side error. Please try later.")
				}			
			}			
			fetchData(); 

		//	const catUrl = "http://localhost:8083/api/categories" 

			const catUrl = APIs.catUrl;
			
			const fetchCategoriesData = async () => {
				try {
					const response = await fetch(catUrl);
					const json = await response.json();
					setCategories(json);
					} 
				catch (error) {
					alert("From adminViewProducts: fetching categories, Server-side error. Please try later.")
				}			
			}			
			fetchCategoriesData(); 
		}	
		setTimeout(delay, 100);	
							
	},[refresh, allProductsBool]);
	
	
	useEffect(() => {
		
		const tempArray = [];
		for (let k in products) {		
			tempArray.push(false);	
		}
	setDispCatDialog(tempArray);
	},[products])
	
	
	useEffect(() => {		
	//	const brandsUrl = "http://localhost:8083/api/brands";
		
		const brandsUrl = APIs.brandsUrl;
		
		const fetchBrandsData = async () => {
			try {
				const response = await fetch(brandsUrl);
				const json = await response.json();
				setAllBrands(json);
				} 
			catch (error) {
				alert("From adminAddProduct: fetching brands, Server-side error. Please try later.")
			}			
		}			
		fetchBrandsData();				
	},[])	
	

	
	
	const dropdownCategoriesList = [];	
 	for (let x in categories) {
		dropdownCategoriesList.push(<option className="admin-options" value={categories[x].categoryId}> {categories[x].categoryName}</option>)									
	}
	
	const dropdownBrandsList = [];
	for (let x in allBrands) {
		dropdownBrandsList.push(<option className="admin-options" value={allBrands[x].brandId}> {allBrands[x].brandName}</option>)		
	}
	
	useEffect( () => {
		
		if(search.length > 0) {
			
			if(selectedType == "product") {
				
			//	const searchProductUrl = "http://localhost:8083/api/search-products-and-batches/" + search;
				
				const searchProductUrl = APIs.searchProductUrl + search + "/" + itemsPerPage + "/" + startIndex;
				
				const fetchProductSearchData = async () => {
					try {
						const response = await fetch(searchProductUrl);
						let json = await response.json();					
						setProducts(json.dtos);
						if(startIndex == 0){
							initiatePagination(json.countOfProducts);
						}
						
					} 
					catch (error) {
						alert("From adminAddProduct: fetching brands, Server-side error. Please try later.")
					}			
				}			
				fetchProductSearchData();				
			}
			else if(selectedType == "sku") {
				//not needed at the moment.
			}
		}
		
		else {	
			if(selectedCategory.length > 0 && selectedBrand.length == 0){
				
			//	const searchProductsByCategoryUrl = "http://localhost:8083/api/search-products-and-batches-by-category/" + selectedCategory + "/" + itemsPerPage + "/" + startIndex;
				
				const searchProductsByCategoryUrl = APIs.searchProductsByCategoryUrl + selectedCategory + "/" + itemsPerPage + "/" + startIndex;
				
				const fetchProductSearchDataByCategory = async () => {
					try {
						const response = await fetch(searchProductsByCategoryUrl);					
						const json = await response.json();
						
						setProducts(json.dtos)
						if(startIndex == 0){
							initiatePagination(json.countOfProducts);
						}
						
						let tempDelete = [];
						for( let x in json.dtos) {
							tempDelete.push(false);
						}
						setProductDeleteBool(tempDelete);
					} 
					catch (error) {
						alert("From adminAddProduct: fetching brands, Server-side error. Please try later.")
					}			
				}			
				fetchProductSearchDataByCategory();				
			}	
		
			else if(selectedCategory.length == 0 && selectedBrand.length > 0) {
					
			//	const searchProductsByBrandUrl = "http://localhost:8083/api/search-products-and-batches-by-brand/" + selectedBrand + "/" + itemsPerPage + "/" + startIndex;
				
				const searchProductsByBrandUrl = APIs.searchProductsByBrandUrl + selectedBrand + "/" + itemsPerPage + "/" + startIndex;
				
				const fetchProductSearchDataByBrand = async () => {
					try {
						const response = await fetch(searchProductsByBrandUrl);
						const json = await response.json();					
						
						setProducts(json.dtos);	

						if(startIndex == 0){
							initiatePagination(json.countOfProducts);
						}
						
						let tempDelete = [];
						for( let x in json) {
							tempDelete.push(false);
						}
						setProductDeleteBool(tempDelete);
					} 
					catch (error) {
						alert("From adminAddProduct: fetching brands, Server-side error. Please try later.")
					}			
				}			
				fetchProductSearchDataByBrand();							
			}			
		}	
	},[searchProductsBool])
	
	
	
	
	
	const handleAddCategory = (productId, key) => {
		
		const tempArray2 = JSON.parse(JSON.stringify(dispCatDialog));
		tempArray2[key] = true;	
		setDispCatDialog(tempArray2);
	}
	
	const handleDeleteCategory = (productId, categoryId) => {
		
		const delProductCategoryReq = async () => {
			try {
				const index = findProductIndexById(productsArray, productId);
				const prodJSON = JSON.parse(JSON.stringify(productsArray[index]));
				
				prodJSON.categories = deleteCategory(prodJSON.categories, categoryId)
	
			//	const delProdCatUrl = "http://localhost:8083/api/products-categories-delete/" + productId + "/" + categoryId;		

				const delProdCatUrl = APIs.delProdCatUrl + productId + "/" + categoryId;	
				
				const response = await fetch(delCatUrl,{method:"PUT"});
				
				if(!response.ok){
					alert("HTTP error. Please try later.")
				}
				else {
				//change display status from redux store of the selected productId
				//	deleteCategoriesOfProductsInStore(index, prodJSON.categories);
				
				const updatedProducts = JSON.parse(JSON.stringify(products));
				updatedProducts[index].categories = deleteCategory(updatedProducts[index].categories, categoryId);
				setProducts(updatedProducts);						
				} 
			} 
			catch (error) {
				alert("HTTP/Network error. Please try later.")
			}		
		}			
		delProductCategoryReq();		
	}
	
	
	const handleProdDisplayChange = (productId) => {

		// code for PUT request to toggle display status. IF successful, then following code..
		const putDisplayReq = async () => {
			try {
				
				const findProductIndexById = (list, id) => {
					const index = list.findIndex((item) => item.product.productId == id);
					return index;
				};
				const index = findProductIndexById(productsArray, productId);
				
				const prodJSON = JSON.parse(JSON.stringify(productsArray[index].product));
				prodJSON.display = !prodJSON.display;
				
				const productToggleDisplayUrl = APIs.productToggleDisplayUrl;
				
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(prodJSON)
				};
				const response = await fetch(productToggleDisplayUrl, requestOptions);
				const json = await response.json();
				
				if(!response.ok){
					alert("HTTP error. Please try later.")
				}
				else {
				//change display status from redux store of the selected productId
				//	toggleProdDisplayStatusInStore(productId)
				//change status in state variable				

					const productsArrayUpdated = JSON.parse(JSON.stringify(productsArray));					
					for (let x in productsArrayUpdated) {
						if(x==index) {
							productsArrayUpdated[x].product.display = !productsArrayUpdated[x].product.display;
						}
					}
					setProducts(productsArrayUpdated)
				}
			} 
			catch (error) {
				alert("HTTP/Network error. Please try later.")
			}		
		}	
		
		putDisplayReq();
	}
	
	const handleDeleteProductBool = (key) => {
		
		const tempProductDeleteBool = JSON.parse(JSON.stringify(productDeleteBool));		
		tempProductDeleteBool[key] = !tempProductDeleteBool[key]		
		setProductDeleteBool(tempProductDeleteBool);		
	}
	
	const handleDeleteProduct = () => {
		
		const deleteProductConfirmation = confirm("Are you sure to delete this product? This action is irreversible.");
		
		if(deleteProductConfirmation == true) {
			
			for(let x in productDeleteBool) {
				
				if(productDeleteBool[x] == true) {
					
					let productId = products[x].product.productId;
			
				//	const delProdUrl = "http://localhost:8083/api/delete-product/"; 
				
					const delProdUrl = APIs.delProdUrl; 
					
					const requestOptionsDelete = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(productId)
					}
					
					
					const delData = async () => {
						try {
							const response = await fetch(delProdUrl,requestOptionsDelete);
					        const json = await response.json();
							
							if(!response.ok){
								alert("HTTP error. Please try later.")
								setRefresh(!refresh);
							}
							else {	
								//need code to refresh the page after pagination is done...............................................	
								console.log("json")
								console.log(json)
								
								if(json == false){
									alert("Cannot delete this product as transactions with the product exist.");
								}
								else{
									setRefresh(!refresh);
								}
							}            
						} 
						catch (error) {
							alert("HTTP/network error. Please try later.")
						}			
					}			
					delData(); 
				}	
			}		
		}	
	}
	
	const handleViewProduct = () => {
		
	}
	
	const handleInventoryOfProduct = (productId) => {
		
		setSelectedProductId(productId);		
		setInventoryDialogDisp(true);
	}
	
	const handleBatchesDisplay = (productId, productName, brandName) => {
		
		const batchesDisplayProductInfoTemp = {}
		batchesDisplayProductInfoTemp.productId = productId;
		batchesDisplayProductInfoTemp.productName = productName;
		batchesDisplayProductInfoTemp.brandName = brandName; 
		
		setBatchesDisplayProductInfo(batchesDisplayProductInfoTemp);
		
		setBatchesDisplayDialogDisp(true);
	}
	
	const handleStockUpdate = (productId, productName, brandName) => {
		
		const stockUpdateProductInfoTemp = {}
		stockUpdateProductInfoTemp.productId = productId;
		stockUpdateProductInfoTemp.productName = productName;
		stockUpdateProductInfoTemp.brandName = brandName; 
		
		setStockUpdateProductInfo(stockUpdateProductInfoTemp); 			
		setStockUpdateDialogDisp(true);		
	}
	
	// Pagination Code Begins...................................................................	

//	getPaginatedProducts = products.slice(startIndex, endIndex);
//	getPaginatedProducts = products;
	paginationGroup = pagination.slice(start, end);	

    const next = () => {
        setCurrentPage((page) => page + 1);
	//	currentPage.current = currentPage.current + 1;
		if(selectedStatus =="" && selectedCategory =="" && selectedBrand =="" ) {
			setAllProductsBool(!allProductsBool);
		}
		else{
			setSearchProductsBool(!searchProductsBool);
		}
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
	//	currentPage.current = currentPage.current - 1;
		if(selectedStatus =="" && selectedCategory =="" && selectedBrand =="") {
			setAllProductsBool(!allProductsBool);
		}
		else{
			setSearchProductsBool(!searchProductsBool);
		}
    };

    const handleActive = (item) => {
        setCurrentPage(item);
	//	currentPage.current = item;
		if(selectedStatus =="" && selectedCategory =="" && selectedBrand =="") {
			setAllProductsBool(!allProductsBool);
		}
		else{
			setSearchProductsBool(!searchProductsBool);
		}		
    };

    const selectChange = (newItemsPerPage) => {
		
        setItemsPerPage(Number(newItemsPerPage));
        setCurrentPage(1);
	//   currentPage.current = 1;
		setAllProductsBool(!allProductsBool);
     //   setPages(Math.ceil(products.length / Number(newItemsPerPage))); 
    };  
	
	// Pagination Code Ends...................................................................
	
	
	
	const productsArray = [];	
	for(let x in products) {	
		const tempQuantity = 0;
		for(let y in products[x].batchesData){
			tempQuantity = tempQuantity + parseInt(products[x].batchesData[y].quantity);
		}
		
		products[x].product.quantity = tempQuantity;
		productsArray.push(products[x])
	}
	

	let productsTableData = [];
	
	if( productsArray.length >0 && categories!=null) {	
		
		productsTableData = productsArray.map((prodAndBatches, key) => (	

		  <tr>
		  <td className="d-flex justify-content-center pt-60 pb-55" >
			    <input className="" type="checkbox" style={{width:"20px", height:"20px"}} checked={productDeleteBool[key]} onChange={() => handleDeleteProductBool(key)}/>
		  </td>
		  
		  <td style={{textAlign:"center"}}> {prodAndBatches.product.productId} </td>
		{ prodAndBatches.product.images[0] ?  <td className="pb-0">  <img src={prodAndBatches.product.images[0].imageUrl}/> </td> : <td></td> } 
			  
		  <td style={{textAlign:"center"}}> {prodAndBatches.product.productName} </td>
		  <td style={{textAlign:"center"}}> {prodAndBatches.product.brand.brandName} </td>
		  <td>  
				<div className="row">								
					 <div className="col-md-2 admin-cat-plus-divout">
						<a onClick={()=> handleAddCategory(prodAndBatches.product.productId, key)}>
							<div className="admin-cat-plus-divin"> </div>	
						</a>
						 {dispCatDialog[key] && <CatDialogBox keyNo={key} products={products} setProducts={setProducts} categories={categories} productName={prodAndBatches.product.productName} productId={prodAndBatches.product.productId} catDialog={dispCatDialog} setCatDialog={setDispCatDialog}/>} 
					</div> 
				
					<div className="col-md-10 admin-cat-list width-100">
						{prodAndBatches.product.categories.map(
						(cat) => { 
						
						const catChainString = catChainDeveloper(cat, categories); 
						return (<div className="d-inline-flex"> 
									<div>{catChainString}</div>
									<div className="admin-cat-minus-divout">
										<a onClick={()=> handleDeleteCategory(prodAndBatches.product.productId, cat.categoryId)}>
											<div className="admin-cat-minus-divin"> </div>
										</a>
									</div>		
								</div>);
						})} 
					</div>
				</div>
		  </td>
		  <td style={{textAlign:"center"}}> {prodAndBatches.product.productMrp} </td>
		  <td style={{textAlign:"center"}}> {prodAndBatches.product.quantity} </td>
		  <td className="d-flex justify-content-center pt-50 pb-55" >
			    <input className="" type="checkbox" style={{width:"30px", height:"30px"}} checked={prodAndBatches.product.display} onChange={() => handleProdDisplayChange(prodAndBatches.product.productId)}/>
		  </td>
		  <td className="px-1" style={{minWidth:"100px"}}> 
				<div className="d-flex justify-content-around">
					<a target="_blank" href={"/admin/edit-product/" + prodAndBatches.product.productId} dataToggle="tooltip" title="Edit Product"><img  style={{width: "20px"}} src="/assets/imgs/icons/pencil-edit-button.svg"></img></a> 
					<a onClick={()=> handleViewProduct(prodAndBatches.product.productId)} dataToggle="tooltip" title="View Product"><img style={{width: "20px"}} src="/assets/imgs/icons/display.svg"></img></a> 
					</div>	
				<div className="d-flex justify-content-around">	
					<a onClick={()=> handleInventoryOfProduct(prodAndBatches.product.productId)} dataToggle="tooltip" title="Purchase-Sales"><img style={{width: "20px"}} src="/assets/imgs/icons/inventory.svg"></img></a>  
					<a onClick={()=> handleBatchesDisplay(prodAndBatches.product.productId, prodAndBatches.product.productName, prodAndBatches.product.brand.brandName)} dataToggle="tooltip" title="Batches"><img style={{width: "20px"}} src="/assets/imgs/icons/batches.svg"></img></a> 
					<a onClick={()=> handleStockUpdate(prodAndBatches.product.productId, prodAndBatches.product.productName, prodAndBatches.product.brand.brandName)} dataToggle="tooltip" title="Update Stock"><img style={{width: "20px"}} src="/assets/imgs/icons/stock-update.svg"></img></a>  
				</div>				
		  </td> 							
		  </tr>	 
	 ))
	}


return(
<>

	<div className="container">
	
		<div className="row mt-10">
			<div className="row ml-10 mt-10 mb-10">
				<label style={{fontSize:"30px"}}> Products </label>
			</div>	
			<div className="col-12 d-flex justify-content-between align-items-end">
				
				<div className="d-inline-flex align-items-end">
					<input type="text" className="input-admin  mx-2" style={{height:"30px", width:"150px", borderRadius:"0px", fontSize:"12px"}} value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)} 
							onKeyDown={(e)=>{
							if(e.key === "Enter") {
								setCurrentPage(1);
								setSearchProductsBool(!searchProductsBool); 
							}
					}} />
					
					<select value={selectedType}   className="form-select mx-2 py-0" style={{height:"30px", borderRadius:"0px", backgroundColor:"#EDEEF0", fontSize:"12px"}}  onChange={(e) => setSelectedType(e.target.value)}>
						<option value="product" selected> Product </option>
						<option value="sku" > SKU </option>
					</select>
					
					<select value={selectedCategory}  className="form-select mx-2 py-0" style={{height:"30px", width:"120px", borderRadius:"0px", backgroundColor:"#EDEEF0", fontSize:"12px"}}  onChange={(e) => setSelectedCategory(e.target.value)}>
						<option value="" selected> Category </option>
						{dropdownCategoriesList} 
					</select>
					
					<select value={selectedBrand}   className="form-select mx-2 py-0" style={{height:"30px", width:"120px", borderRadius:"0px", backgroundColor:"#EDEEF0", fontSize:"12px"}}  onChange={(e) => setSelectedBrand(e.target.value)}>
						<option value="" selected> Brand </option>
						{dropdownBrandsList} 
					</select>
					
					<select value={selectedStatus}   className="form-select mx-2 py-0" style={{height:"30px", borderRadius:"0px", backgroundColor:"#EDEEF0", fontSize:"12px"}}  onChange={(e) => setSelectedStatus(e.target.value)}>
						<option value="all"  selected> ALL </option>
						<option value="on" > ON </option>
						<option value="off" > OFF </option>
						
					</select>
					<button type="button" style={{
												width:"100px",
												height:"30px",
												borderRadius:"none",
												backgroundColor:"#5E72E3",
												color:"#ffffff",
												border:"none",
												fontWeight:"500"	
					}} onClick={() => {
						setCurrentPage(1);
						setSearchProductsBool(!searchProductsBool);
						}} > Submit </button>
					
				</div>
				
				<button type="button" style={{
												width:"100px",
												height:"30px",
												borderRadius:"none",
												backgroundColor:"#5E72E3",
												color:"#ffffff",
												border:"none",
												fontWeight:"500"	
				}} onClick={handleDeleteProduct} > Delete </button>
			
			</div>
		</div>
		
		<hr className="my-1"/>
	
		<div className ="row mt-10">
			<div className="col-md-12 ">

				<table className="table" >
				<thead style={{
						border: "1px solid #000000",	
						position: "sticky",
						top: 0,																	
						right: 0,
						backgroundColor: "#5E72E3",
						color:"#ffffff",
						textAlign:"center"}}>
					<tr> 
						<th> Delete</th>
						<th> Id</th> 
						<th className="table-img-width">Image</th> 
						<th> Product Name</th> 
						<th className="table-sku-width"> Brand </th> 
						<th className="table-cat-width"> Categories </th> 
						<th> Price </th> 
						<th> Qty </th> 
						<th> Status </th> 
						<th> Action </th> 
					</tr>
				</thead>	
				<tbody>
				  {productsTableData}  				
				</tbody>	
				</table>
			</div>
		</div>
		
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
		
			{ inventoryDialogDisp && <ProductInventoryDataDialog  setInventoryDialogDisp={setInventoryDialogDisp} productId={selectedProductId} /> }
			
			{ batchesDisplayDialogDisp && < BatchesDisplayDialog productInfo={batchesDisplayProductInfo}
			setBatchesDisplayDialogDisp={setBatchesDisplayDialogDisp}  /> }
			
			{ stockUpdateDialogDisp && < StockUpdateDialog handleStockUpdate={handleStockUpdate}
			setStockUpdateDialogDisp={setStockUpdateDialogDisp} productInfo={stockUpdateProductInfo}  /> }
		
	</div>

</>		
)}

export default ComponentManageProducts;