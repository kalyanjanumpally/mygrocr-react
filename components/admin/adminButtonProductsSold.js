import React from "react";

const AdminButtonProductsSold = ({dto, handleSelectedProduct}) => {
	

	
return(
<>
{ dto.quantity > 0 &&
	<a onClick={()=> handleSelectedProduct(dto)}>	
		<div className="d-flex">		
			<div id="admin-product-button" className="text-center pb-1">
			
				<p className="py-1 mb-0 " style={{color:"#000000"}}> {dto.batchProductName} </p> 
				
				<p className="pb-0 mb-0 px-1 " style={{color:"#ffffff", backgroundColor:"#3BB77E"}}>	Qty : {dto.quantity}, MRP : Rs. {dto.mrp} </p>
				<label className="mt-2 px-1" style={{color:"#ffffff", backgroundColor:"#3BB77E"}}> Add to Return </label>
			
			</div>	
		</div>	
	</a>	
}	

{ dto.quantity == 0 &&	
		<div className="d-flex">		
			<div id="admin-product-button" className="text-center pb-1">
			
				<p className="py-1 mb-0 " style={{color:"#000000"}}> {dto.batchProductName} </p> 
				
				<p className="pb-0 mb-0 px-1 " style={{color:"#ffffff", backgroundColor:"#3BB77E"}}>	Qty : {dto.quantity}, MRP : Rs. {dto.mrp} </p>	
				<label className="mt-2 px-1" style={{color:"#ffffff", backgroundColor:"#F88379"}}> Returned </label>
			
			</div>	
		</div>		
}

</>

)}

export default AdminButtonProductsSold;