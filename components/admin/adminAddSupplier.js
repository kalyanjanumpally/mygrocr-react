import React from "react";
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import * as APIs from "./../../util/springAPIs";

const ComponentAddSupplier = () => {
	
	const [suppliers, setSuppliers] = useState(null);
	const [newSupplierName, setNewSupplierName] = useState(null);
	const [contactPerson, setContactPerson] = useState(null);
	const [phone1, setPhone1] = useState(null);
	const [phone2, setPhone2] = useState(null);
	const [email, setEmail] = useState(null);
	const [address, setAddress] = useState(null);
	
	const [formErrors, setFormErrors] = useState({});
	const formErrorsRef = useRef({});
	const isSubmit = useRef(false);
	const [refresh, setRefresh] = useState(false);
	
	useEffect(() => {		
	//	const suppliersUrl = "http://localhost:8083/api/suppliers" 
		const suppliersUrl = APIs.suppliersUrl
		
		
		const fetchData = async () => {
			try {
				const response = await fetch(suppliersUrl);
				const json = await response.json();
				setSuppliers(json);
				} 
			catch (error) {
				alert("From adminAddSupplier: fetching suppliers, Server-side error. Please try later.")
			}			
		}			
		fetchData(); 					 	
	},[refresh]);
	
	const emptyForm = () => {
		
	setNewSupplierName("");
	setContactPerson("");
	setPhone1("");
	setPhone2("");
	setEmail("");
	setAddress("");
		
	}
		
	const handleNewSupplierNameChange = (e) => {
		setNewSupplierName(e.target.value);
	}
	
	const handleContactPersonChange = (e) => {
		setContactPerson(e.target.value);
	}	
	
	const handlePhone1Change = (e) => {
		setPhone1(e.target.value);
	}
	
	const handlePhone2Change = (e) => {
		setPhone2(e.target.value);
	}
	
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}
	
	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	}
	
	
	const validate = (newSupplierName) => {
		const errors = {};
		if (!newSupplierName) {
			errors.newSupplierName = "Supplier Name is required!";		
		}
		
		if(!phone1) {
			errors.phone1 = "Phone Number is required!";	
		}
		else if (false) {
			errors.phone1 = "Phone Number must contain only digits.";
		}
		
		if(false) {
			errors.phone2 = "Phone Number must contain only digits.";
		}
		
		if(false) {
			errors.email = "Email id not in correct format.";
		}

		formErrorsRef.current = errors;
		return errors;
	}

	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		isSubmit.current = true;
		setFormErrors(validate(newSupplierName));
			
		if (Object.keys(formErrorsRef.current).length === 0 && isSubmit.current) {
		
			// Validation completed 										
			// save new category to categories database				
			//create JSON object for POSTing	
						
			const checkDuplicateSupplier = suppliers.filter((item)=> item.supplierName==newSupplierName);
			
			if(checkDuplicateSupplier.length>0) {
				alert("Supplier already exists.")
			}
			else {			
				
				const supplierJSON = {
					"supplierName": newSupplierName,
					"contactPerson": contactPerson,
					"phoneNo1": phone1,
					"phoneNo2": phone2,
					"email": email,
					"address": address
				};	
					
				//POST API call..					
			//	const saveSupplierUrl = "http://localhost:8083/api/suppliers" 
				
				const saveSupplierUrl = APIs.saveSupplierUrl;
							
				const requestOptions = {
					 method: 'POST',
					 headers: { 'Content-Type': 'application/json' },
					 body: JSON.stringify(supplierJSON)
					};
				
				const saveSupplier = async () => {
					try {
						const response = await fetch(saveSupplierUrl, requestOptions);
						const json = await response.json();

						if(!response.ok) {
							alert("HTTP Error. Please try later.");
						}
						else {
							alert("New Supplier Added.")
							emptyForm();
							setRefresh(!refresh);
						}
					}				
					catch (error) {
						console.log("error: "+ error)
						alert("HTTP/Network error. Please try later.");
					}			
				}			
				saveSupplier();	
			}
		}
	}
	
return(	
	<>
		 <div className="container" >			
				<div className="row my-2">  
					<div className="col-4">
						
						<form className="d-inline-flex flex-column mx-4 my-4" onSubmit={handleSubmit}>				
							<input type="text" className="form-control mb-3" value={newSupplierName} placeholder="New Supplier Name *" onChange={handleNewSupplierNameChange}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.newSupplierName}</p>
							
							<input type="text" className="input-admin mb-3" value={contactPerson} placeholder="Contact Person " onChange={handleContactPersonChange}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.contactPerson}</p>
							
							<input type="text" className="input-admin mb-3" value={phone1} placeholder="Phone No. *" onChange={handlePhone1Change}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.phone1}</p>
							
							<input type="text" className="input-admin mb-3" value={phone2} placeholder="Additional Phone No." onChange={handlePhone2Change}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.phone2}</p>
							
							<input type="text" className="input-admin mb-3" value={email} placeholder="Email " onChange={handleEmailChange}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.email}</p>
							
							<input type="text" className="input-admin mb-3" value={address} placeholder="Address " onChange={handleAddressChange}  />
							<p className ="form-validation-error">{isSubmit.current && formErrors.address}</p>

							<button className="btn-admin" type="submit">
								Add New Supplier
							</button>				
						</form>	
						
						
						
					</div>
				</div>				
		</div>	 
	
	</>	
)}


export default ComponentAddSupplier;