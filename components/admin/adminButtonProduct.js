import React from "react";

const AdminButtonProduct = ({dto, selectedKey, handleSelectedProduct}) => {

	const totalQuantity = 0;
	
	for(let x in dto.batchesData){
		totalQuantity = totalQuantity + parseInt(dto.batchesData[x].quantity);
	}	
	
	const dispMRP = "";
	
	for(let x in dto.batchesData){
		
		if(parseInt(dto.batchesData[x].quantity) >0) {
			dispMRP = parseInt(dto.batchesData[x].mrp);
		}	
	}
	
return(
<>

	<a onClick={()=> handleSelectedProduct(selectedKey)}>	
	<div className="d-flex">		
		<div id="admin-product-button" className="text-center pb-1">
		
			<p className="py-1 mb-0 " style={{color:"#000000"}}> {dto.product.productName} </p> 
			<p className="pb-0 mb-0 " style={{color:"#808080"}}> {dto.product.brand.brandName} </p> 
			
			<label className="pb-0 mb-0 px-1 " style={{color:"#ffffff", backgroundColor:"#3BB77E"}}>	Qty : {totalQuantity}, MRP : Rs. {dispMRP} </label>	
		
		</div>	
	</div>	
	</a>

</>

)}

export default AdminButtonProduct;