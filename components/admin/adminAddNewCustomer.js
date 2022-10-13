import React from "react";
import Draggable from 'react-draggable';
import Link from "next/link"
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import * as APIs from "./../../util/springAPIs";


const AddNewCustomer = ({ setAddNewCustomerDisp }) => {
	
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone1, setPhone1] = useState("");
	const [phone2, setPhone2] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
		
	const [formErrors, setFormErrors] = useState({});
	const formErrorsRef = useRef({});
	const isSubmit = useRef(false);
	
	const emptyForm = () => {		
		setFirstName("");
		setLastName("");
		setPhone1("");
		setPhone2("");
		setEmail("");
		setAddress("");
		setPostalCode("");
		setCity("");
		setState("");		
	}
	
	
	 const validate = () => {
		 
		 let regExPhone = /^\d{10}$/;
		 
		const errors = {};
		if (!firstName) {
			errors.firstName = "First Name is required!";		
		}
		
		if(!lastName) {
			errors.lastName = "Last Name is required!";	
		}

		
		if(!phone1) {
			errors.phone1 = "Phone No. is required!";
		}
		else if(!phone1.match('[0-9]{10}')){
			errors.phone1 = "Please provide a valid number."
		}
		
		if(phone2.length >0 && !phone2.match('[0-9]{10}')) {
			errors.phone2 = "Please provide a valid number.";
		}
		
		if(email.length > 0 && !email.match(/\S+@\S+\.\S+/)) {
			errors.email = "Please provide a valid email.";
		}
		
		formErrorsRef.current = errors;
		return errors;
	}
 
	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		
	 	isSubmit.current = true;
		setFormErrors(validate());
			
		if (Object.keys(formErrorsRef.current).length === 0 && isSubmit.current) {
		
			// Validation completed 										
			// save new category to categories database				
			//create JSON object for POSTing	

			const fullName = firstName + " " + lastName;
			
			const customerJSON = {
				"firstName": firstName,
				"lastName": lastName,
				"fullName": fullName,
				"phoneNo1": phone1,
				"phoneNo2": phone2,
				"email": email,
				"address": address,
				"city": city,
				"state": state,
				"postalCode": postalCode
			};	
				
			//POST API call..					
		//	const saveCustomerUrl = "http://localhost:8083/api/customer" 
			const saveCustomerUrl = APIs.saveCustomerUrl;
						
			const requestOptions = {
				 method: 'POST',
				 headers: { 'Content-Type': 'application/json' },
				 body: JSON.stringify(customerJSON)
				};
			
			const saveCustomer = async () => {
				try {
					const response = await fetch(saveCustomerUrl, requestOptions);
					//const json = await response.json();

					if(!response.ok) {
						alert("HTTP Error. Please try later.");
					}
					else {
						emptyForm();
						alert("New Customer Added.")
						setAddNewCustomerDisp(false)
						
					}
				}				
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}			
			}			
			saveCustomer();			
		} 
	}
	
	
return(


<>
{/*	<Draggable> */}
		<div className="modal custom-modal d-block">
			<div className="modal-dialog" style={{width:"600px"}}>
				<div className="modal-content pt-0 pb-1">

					
					<div className="modal-header py-0">
						<h5 className="modal-title py-0">Add New Customer</h5>
						<button
							type="button"
							className="btn btn-close btn-close-white"
							onClick={()=> setAddNewCustomerDisp(false)}
						></button> 
					</div>
		
					<div className = "modal-body">
							
						<form className="" onSubmit={handleSubmit}>				
							
							<div className="row">
								<div className="col-6">
									<input type="text" className="form-control  mx-2 " style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={firstName} 
									placeholder="First Name *" onChange={(e)=>setFirstName(e.target.value)}  />
									<p className ="form-validation-error mx-2 ">{isSubmit.current && formErrors.firstName}</p>
									
								</div>	
								<div className="col-6">	
									<input type="text" className="form-control   mx-2" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={lastName} 
									placeholder="Last Name * " onChange={(e)=>setLastName(e.target.value)}  />
									<p className ="form-validation-error mx-2 ">{isSubmit.current && formErrors.lastName}</p>						
								</div>
							</div>	
							
							<div className="row">
								<div className="col-6">
									<input type="text" className="form-control mt-3 mx-2" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={phone1} 
									placeholder="Phone No. *" onChange={(e)=>setPhone1(e.target.value)}  />
									<p className ="form-validation-error mx-2 ">{isSubmit.current && formErrors.phone1}</p>
								</div>
								<div className="col-6">	
									<input type="text" className="form-control mt-3 mx-2" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={phone2} 
									placeholder="Additional No." onChange={(e)=>setPhone2(e.target.value)}  />
									<p className ="form-validation-error mx-2 ">{isSubmit.current && formErrors.phone2}</p>
								</div>
							</div>
							
							<div className="col-12">
								<input type="text" className="form-control mt-3" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={email} 
								placeholder="Email " onChange={(e)=>setEmail(e.target.value)}  />
								<p className ="form-validation-error">{isSubmit.current && formErrors.email}</p>
							</div>
							
							<div className="col-12">
								<input type="textarea" className="form-control mt-3" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={address} 
								placeholder="Address " onChange={(e)=>setAddress(e.target.value)}  />
								<p className ="form-validation-error">{isSubmit.current && formErrors.address}</p>
							</div>
							
							<div className="col-6">
								<input type="text" className="form-control mt-3" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={postalCode} 
								placeholder="Postal Code " onChange={(e)=>setPostalCode(e.target.value)}  />
								<p className ="form-validation-error">{isSubmit.current && formErrors.postalCode}</p>
							</div>
							
							<div className="row">
								<div className="col-6">
									<input type="text" className="form-control mx-2 mt-3" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={city} 
									placeholder="City " onChange={(e)=>setCity(e.target.value)}  />
									<p className ="form-validation-error mx-2 mb-2">{isSubmit.current && formErrors.city}</p>
								</div>
							{/*	<div className="col-6">
									<input type="text" className="form-control mx-2 mt-3" style={{borderRadius:"0px", border:"1px solid #BEBEBE"}} value={state} 
									placeholder="State " onChange={(e)=>setState(e.target.value)}  />
									<p className ="form-validation-error mx-2 mb-2">{isSubmit.current && formErrors.state}</p>	
								</div> */}
							</div>

							<div className="col-12 d-flex justify-content-center">
								<button className="btn-admin mt-3" type="submit" style={{borderRadius:"0px"}}>
									Add New Customer
								</button>
							</div>
						</form>	

					</div>
				</div>
			</div>
		</div>	
		{/*	</Draggable> */}




</>
	
)}

export default AddNewCustomer;