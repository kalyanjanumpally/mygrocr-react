import Link from "next/link";
import { useState } from "react";
import catChainDeveloper from "./catChainDeveloper";
import { connect } from "react-redux";
import Draggable from 'react-draggable';
import { addCategoriesToProductInStore } from "./../../redux/action/adminProducts";
import { findCategoryIndexById, findProductIndexById } from "./../../util/util"
import * as APIs from "./../../util/springAPIs";



const CatDialogBox = ({ products, setProducts, categories, keyNo, productName, productId , catDialog, setCatDialog}) => {
	
	const [selectCatIds, setSelectCatIds] = useState([]); 

    const handleRemove = () => {  
	   const tempArray3 = JSON.parse(JSON.stringify(catDialog));
	   tempArray3[keyNo] = false;
	   setCatDialog(tempArray3)	   
    };
	
 	const catList = []
	for (let x in categories) {
		catList.push([categories[x].categoryId, catChainDeveloper(categories[x], categories)]);		
	} 
			
	const categoryLists = [];	
 	for (let k in catList) {
		categoryLists.push(<option className="admin-options" value={catList[k][0]}> {catList[k][1]}</option>)									
	}						
		 	
	const handleChange = (e) => {		
		const allCats = e.target.options;		
		const cats = [];
        for (let i=0; i<allCats.length; i++) {
			if(allCats[i].selected)
            cats.push(allCats[i].value);
        }
        setSelectCatIds(cats);
	}

	const handleSubmit = (e) => {
		
		e.preventDefault();
		const JSONArray = [...selectCatIds];		
		const prodIndex = findProductIndexById(products, productId)
			
		for (let y in products[prodIndex].categories) {	
			JSONArray = JSONArray.filter(item => parseInt(item) !== products[prodIndex].categories[y].categoryId)
		}

		if(JSONArray.length > 0) {
			
			const newSelectCatIds = JSON.parse(JSON.stringify(JSONArray));
			setSelectCatIds(newSelectCatIds);
			JSONArray.unshift(productId);	
			
			const addCategoriesToProduct = async () => {
				try {				
					 const requestOptions = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(JSONArray)
					}; 
					
				//	 const addCatUrl = "http://localhost:8083/api/products-categories-add/"
					 
					 const addCatUrl = APIs.addCatUrl;
					 
					
					const response = await fetch(addCatUrl, requestOptions);
					
					if(!response.ok){
						alert("HTTP error. Please try later.")
					}
					else {
					//change display status from redux store of the selected productId			
						const selectCats = [];
						for (let x in newSelectCatIds) {
							const index = findCategoryIndexById(categories, newSelectCatIds[x]);
							selectCats.push(categories[index])	
						} 					
					//	addCategoriesToProductInStore(productId, selectCats);
						
						const updatedProducts = JSON.parse(JSON.stringify(products));
						selectCats.map(item => updatedProducts[prodIndex].categories.push(item) )					
						setProducts(updatedProducts);				
					} 
				} 
				catch (error) {
					alert("HTTP/Network error. Please try later.")
				}		
			}			
			addCategoriesToProduct();
		}
		handleRemove();
	}

    return (
        <>
		<Draggable>
			<div className="modal custom-modal d-block">
                <div className="modal-dialog">
                    <div className="modal-content pt-0 pb-1">
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleRemove}
                        ></button>
						
						<div className="modal-header py-0">
							<h5 className="modal-title py-0">{productName}</h5>
						</div>
					
					<form onSubmit={handleSubmit}>	
                        <div className="modal-body admin-modal py-0">	 
							<select multiple={true} size={10} onChange={handleChange}>
								{categoryLists}
							</select>                           
                        </div>
						
						<div className="modal-footer py-0">
							<button type="submit" className="admin-modal-button px-1 py-1 mx-1 my-1">Save</button>
							<button type="button" className="admin-modal-button px-1 py-1 mx-1 my-1" data-dismiss="modal" onClick={handleRemove}>Cancel</button>
						</div>	
					</form>
						
                    </div>
                </div>
			</div>	
		</Draggable>
        </>
    );
};

export default CatDialogBox;