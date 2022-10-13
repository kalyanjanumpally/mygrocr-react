import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import * as APIs from "./../../util/springAPIs";



const ComponentAddCategory = () => {
	
	const [categories, setCategories] = useState("");
	const [newCatName, setNewCatName] = useState("");	
	const [parentCatId, setParentCatId] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const formErrorsRef = useRef({});
	const isSubmit = useRef(false);
	const [refresh, setRefresh] = useState(false);
	
	useEffect(() => {		
	//	const catUrl = "http://localhost:8083/api/categories"
		const catUrl = APIs.catUrl;
 		
		const fetchData = async () => {
			try {
				const response = await fetch(catUrl);
				const json = await response.json();
				setCategories(json);
				} 
			catch (error) {
				alert("From adminAddCategory: fetching categories, Server-side error. Please try later.")
			}			
		}			
		fetchData(); 					 	
	},[refresh]);
	
	const dropdownList = [];
	if(categories != null && categories.length > 0) {
		for(let x in categories) {	
			dropdownList.push(<option value={categories[x].categoryId}> {categories[x].categoryName} </option>);	
		}
	}
		
	const handleNewCatNameChange = (e) => {
		setNewCatName(e.target.value);
	}
	
	const validate = (newCatName, parentCatId) => {
		const errors = {};
		if (!newCatName) {
			errors.newCatName = "Category Name is required!";		
		}
		else {
			for(let x in categories) {			

				if(categories[x].categoryName == newCatName){
					errors.newCatName = "Category Name already exists! Enter a new name.";				
					break;
				}
			}		
		}
		if (parentCatId=="") {
			errors.parentCatId = "Parent Category is required!";
		} 
			formErrorsRef.current = errors;
			return errors;
	}

	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		isSubmit.current = true;
		setFormErrors(validate(newCatName, parentCatId));
			
		if (Object.keys(formErrorsRef.current).length === 0 && isSubmit.current) {

			// Validation completed 										
			// save new category to categories database				
			//create JSON object for POSTing				
			
			const catJSON = {
				"categoryName": newCatName,
				"parentCategoryId": parentCatId
			};	
				
			//POST API call..					
		//	const saveCatUrl = "http://localhost:8083/api/categories" 
			const saveCatUrl =  APIs.saveCatUrl;
						
			const requestOptions = {
				 method: 'POST',
				 headers: { 'Content-Type': 'application/json' },
				 body: JSON.stringify(catJSON)
				};
			
			const saveCategory = async () => {
				try {
					const response = await fetch(saveCatUrl, requestOptions);
					const json = await response.json();

					if(!response.ok) {
						alert("HTTP Error. Please try later.");
					}
					else
						setNewCatName("");
						setParentCatId("");
						isSubmit.current= false;					
						setRefresh(!refresh);				
						alert("New Category Saved: " + json.categoryName);					
					} 
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}			
			}			
			saveCategory();								
		}
	}
	
return(	
	<>
		 <div className="container" >			
				<div className="row my-2">  
					<div className="col-4">
						
						<form className="d-inline-flex flex-column mx-4 my-4" onSubmit={handleSubmit}>				
							<input type="text" className="input-admin mb-3" value={newCatName} placeholder="New Category Name *" onChange={handleNewCatNameChange}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.newCatName}</p>
							
							
							<select  className="form-select mb-3" style={{height:"40px", 
																		  width:"240px", 
																		  borderRadius:"0px", 
																		  backgroundColor:"#5E72E3",
																		  color:"#ffffff",																								 
																		  fontSize:"16px"}} 
							value={parentCatId} onChange={(e) => setParentCatId(e.target.value)}>
								<option value="" hidden selected> Select Parent Category </option>
								{dropdownList} 
							</select> 
							<p className ="form-validation-error">{isSubmit.current && formErrors.parentCatId}</p>							
							

							<button style={{
											width:"240px",
											height:"40px",
											borderRadius:"0px",
											backgroundColor:"#5E72E3",
											color:"#ffffff",
											border:"none",
											fontWeight:"500",
											fontSize:"16px",
										}} type="submit">
								Add New Category
							</button>				
						</form>	
						
						
						
					</div>
				</div>				
		</div>	 
	
	</>	
)}


export default ComponentAddCategory;