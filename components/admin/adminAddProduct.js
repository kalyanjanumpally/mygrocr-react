import React from "react";
import Link from "next/link"
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
//import { connect } from "react-redux";
//import { addCategoriesToStore } from "./../../redux/action/categories";
import catChainDeveloper from "./catChainDeveloper";
import { findCategoryIndexById } from "./../../util/util"
import ImageManagerWindow from "./imageManagerWindow"
import dynamic from 'next/dynamic'
import * as APIs from "./../../util/springAPIs";


const ComponentAddProduct = () => {
	
	const [formErrors, setFormErrors] = useState({});
	const formErrorsRef = useRef({});
	const isSubmit = useRef(false);
	const [images, setImages] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);
	const [productName, setProductName] = useState(null)
	const [brandId, setBrandId] = useState(null);
	const [allBrands, setAllBrands] = useState(null);
	const [newBrandName, setNewBrandName] = useState("");
	const [reFetchBrandsToggle, setReFetchBrandsToggle] = useState(false);
	const [selectCategoryIds, setSelectCategoryIds] = useState([]);
	const [sku, setSKU] = useState(null);
	const description = useRef("");
	const [sortOrder, setSortOrder] = useState(null);
	const [mrp, setMRP] = useState(null);	
	const [gst, setGST] = useState(null);	
	const [metaTitle, setMetaTitle] = useState(null);	
	const [hsnCode, setHsnCode] = useState(null);	
	const [metaDescription, setMetaDescription] = useState(null);		
	const [metaKeywords, setMetaKeywords] = useState(null);	
	const [seoURL, setSeoURL] = useState(null);
	const [display, setDisplay] = useState(1);
	const [openImagesManager, setOpenImagesManager] = useState(false);
	const [categories, setCategories] = useState(null);
	

	const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})
	
	useEffect(() => {		
	//If Categories data is not available in redux store, then only fetch data..
	
	//	const catUrl = "http://localhost:8083/api/categories" 	
		const catUrl = APIs.catUrl;
		
		const fetchCategoriesData = async () => {
			try {
				const response = await fetch(catUrl);
				const json = await response.json();
				setCategories(json);
				} 
			catch (error) {
				alert("From adminAddProduct: fetching categories, Server-side error. Please try later.")
			}			
		}			
		fetchCategoriesData(); 			
	},[]);
	
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
		
	},[reFetchBrandsToggle]);
	
	
	
	const handleProductNameChange = (e) => {
		setProductName(e.target.value);
	}
	
	const dropdownBrandsList = [];
	if(allBrands!= null && allBrands.length > 0) {
		for(let x in allBrands) {	
			dropdownBrandsList.push(<option className="admin-options" value={allBrands[x].brandId} > {allBrands[x].brandName} </option>);
		}
	}	
	
	const handleBrandSelect = (e) => {				
		const selectedBrandId = e.target.value;
		setBrandId(selectedBrandId);
	}
	
	const handleDeleteImage = (key) => {
		
		const tempImages = [...images];	
		const filteredImages = tempImages.filter((img,iterKey)=>iterKey!=parseInt(key)) 	
		setImages(filteredImages)	
	}
	
	const catList = []
	if(categories != null && categories.length > 0) {
		for (let x in categories) {
			catList.push([categories[x].categoryId, catChainDeveloper(categories[x], categories)]);		
		}
	}
	const categoryLists = [];	
 	for (let k in catList) {
		categoryLists.push(<option className="admin-options" value={catList[k][0]}> {catList[k][1]}</option>)									
	}	
	const handleCategoriesChange = (e) => {	
		const allCats = e.target.options;		
		const cats = [];
		for (let i=0; i<allCats.length; i++) {
			if(allCats[i].selected)
			cats.push(allCats[i].value);
		}
		setSelectCategoryIds(cats);
	}
	
	const handleDisplayChange = () => {
		setDisplay(!display)
	}
	
	const handleSKUChange = (e) => {
		setSKU(e.target.value)		
	}
	
	const handleMRPChange = (e) => {
		setMRP(e.target.value)
	}
	
	const handleHSNCodeChange = (e) => {
		setHsnCode(e.target.value)
	}
	
	const handleSEOUrlChange = (e) => {
		setSeoURL(e.target.value)
	}
	
	const handleGSTChange = (e) => {
		setGST(e.target.value)
	}
	
	const handleSortOrderChange = (e) => {
		setSortOrder(e.target.value)
	}
	
	const handleMetaTitleChange = (e) => {
		setMetaTitle(e.target.value)
	}
	
	const handleMetaDescriptionChange = (e) => {
		setMetaDescription(e.target.value)
	}
	
	const handleMetaKeywordsChange = (e) => {
		setMetaKeywords(e.target.value)
	}

	
	const validate = (productName, sku, selectCategoryIds) => {
		
		const errors = {};
		
		if (!productName) {
			errors.productName = "Product Name is required!";		
		}
				
		if (!sku) {
			errors.sku = "SKU is required!";		
		}
		if (selectCategoryIds.length == 0) {
			errors.selectCategoryIds = "Categories are required!";		
		} 
		
		
		formErrorsRef.current = errors;
		return errors;
	} 

	const emptyForm = () => {
		setProductName("");
		setBrandId("");
		setSelectCategoryIds([]);
		setSKU("");
		setSortOrder("");
		setMRP("");
		setGST("");
		setMetaTitle("");
		setHsnCode("");
		setMetaDescription("");
		setMetaKeywords("");
		setSeoURL("");
		setImages([]);
		description.current="";
	}
	
	const handleSubmit = (e) => {
		
		e.preventDefault();
		isSubmit.current = true;
		setFormErrors(validate(productName, sku, selectCategoryIds));
			
		if (Object.keys(formErrorsRef.current).length === 0 && isSubmit.current) {

			// Validation completed 										
			// save new product to database				
			//create JSON object for POSTing	
				
			const saveNewProduct = async () => {
								
				const prodCategories = [];
				for (let x in selectCategoryIds) {
					let catIndex = categories.findIndex((item) => item.categoryId == parseInt(selectCategoryIds[x]))
					prodCategories.push(categories[catIndex])
				}
				const prodBrand = allBrands[allBrands.findIndex((item) => item.brandId == brandId)];				

				const newProdJSON = {
					"productName": productName,
					"description": description.current,
					"brand": prodBrand,
					"images": images,
					"categories": prodCategories,
					"sku": sku,
					"productMrp": mrp,
					"hsnCode": hsnCode,
					"gst": gst,
					"sortOrder": sortOrder,
					"metaTitle": metaTitle,
					"metaDescription": metaDescription,
					"metaKeywords": metaKeywords,
					"seoURL": seoURL,
					"display": display,
				};	
				
				const requestOptions = {
					 method: 'POST',
					 headers: { 'Content-Type': 'application/json' },
					 body: JSON.stringify(newProdJSON)
				};			
			//	const saveNewProdUrl = "http://localhost:8083/api/products" 	
				const saveNewProdUrl = APIs.saveNewProdUrl;
					
				try {
					const response = await fetch(saveNewProdUrl, requestOptions);
						if(!response.ok) {
							alert("HTTP Error. Please try later.");
						}
						else {
							
							try{
								const jsontemp = await response.json();
								if(jsontemp.productId) {
									alert("New Product Saved: " );
									isSubmit.current= false;
								//	emptyForm();
								}
								else {
									alert("Duplicate Product SKU found.")
								}
							}	
							catch {
								alert("Duplicate Product SKU found.")
							}					
						} 								
					}
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}					
			} 
			saveNewProduct(); 								
		} 
	} 
	
	const handleAddNewBrandName = (e) => {
		
		if(e.key == "Enter" && newBrandName.length > 0){
			
			function checkEqual(value) {
				return	e.target.value == value.brandName;
			}	
			
			const findDuplicateBrandName = allBrands.filter(checkEqual);

			if(findDuplicateBrandName.length > 0) {
				alert("Error: This Brand Name already exists. Please enter a new Brand Name.")
			}
			else {	

				const brandJSON = {
					brandName: e.target.value
				}
				
			//	const addNewBrandUrl = "http://localhost:8083/api/add-new-brand";
				const addNewBrandUrl = APIs.addNewBrandUrl;
								
				const requestOptions = {
					 method: 'POST',
					 headers: { 'Content-Type': 'application/json' },
					 body: JSON.stringify(brandJSON)
				};
							
				const fetchAddNewBrand = async () => {
					try {
						const response = await fetch(addNewBrandUrl, requestOptions);
					//	const json = await response.json();
					
						if(!response.ok){
							alert("Server Error: New Brand could not be added. Please try again.")
						}
						else {
							alert("New Brand Added!")
							setNewBrandName("");
							setReFetchBrandsToggle(!reFetchBrandsToggle);
						}
						
						} 
					catch (error) {
						alert("From adminAddProduct: fetching brands, Server-side error. Please try later.")
					}			
				}			
				fetchAddNewBrand();
			}			
		}		
	}
	
return(	
	<>
		 <div className="container" >
			<form  onSubmit={handleSubmit}>	
			
				<div className="row my-2"> 
					<div className="col-12">
						<div className="d-flex justify-content-end">
							<button className="btn-admin save-new-product mx-1" type="button" onClick={emptyForm}>
								Reset
							</button>							
							<button className="btn-admin save-new-product mx-1" type="submit">
								Save
							</button>		
						</div>
					</div>				
				</div>
			
				<div className="row my-2"> 
					<hr/>
					<div className="col-8 mt-2 mb-20">
						
						<div className="row">
							<div className="col-2 d-inline-flex justify-content-end">
								<label className="admin right-spacing" >Product Name:</label>
							</div>	
							<div className="col-10">				
								<input type="text" className="form-control" value={productName} placeholder="" onChange={handleProductNameChange}  />
								<p className ="form-validation-error mb-3">{isSubmit.current && formErrors.productName}</p>
							</div>
						</div>
						
						<div className="row">
							<div className="col-2 d-inline-flex justify-content-end">
								<label className="admin">Description:</label>
							</div>
							<div className="col-10">	
								
								<QuillNoSSRWrapper onChange={(e) => {description.current=e}} style={{height:"300px"}} value={description.current} theme="snow" />
															
							</div>
						</div>
						
						<div className="row mt-60">
							<div className="col-3  d-flex justify-content-end">
								<label className="admin">Brand:</label>
							</div>
							<div className="col-4">	
								<select value={brandId}   className="form-select mb-3" onChange={handleBrandSelect}>
									<option value="" disabled selected hidden> Select Brand </option>
									{dropdownBrandsList} 
								</select> 
							</div>	
							<div className = "col-5">
								<input type="text" className="form-control" value={newBrandName} placeholder="Add New Brand" style={{width:"150px", borderRadius:"0px", height:"40px"}} onKeyDown={handleAddNewBrandName} onChange={(e)=>{setNewBrandName(e.target.value)}} />
									
							</div>
						</div>
						
						

						<hr/>
		


						<div className="row mt-20">
							<div className="col-3 d-flex justify-content-end">
								
								<div>
									<button className="" type="button" className="btn-admin browse-images ml-10" onClick={()=>setOpenImagesManager(true)}> Browse Images </button>											
								</div>	
								<div>	
									{ openImagesManager && <ImageManagerWindow openImagesManager={openImagesManager} setOpenImagesManager={setOpenImagesManager} images={images} setImages={setImages} />}
								</div>
							</div>
							<div className="col-9">	
								
								
								<div className="d-inline-flex flex-wrap">	
										{ images.map((image, key) => <div className="admin-product-upload-wrapper d-flex justify-content-center align-items-center mx-2 my-1 position-relative"> 
										<img className="admin-product-upload mx-2" src={image.imageUrl} />
										<a><img className="position-absolute admin-product-image-delete" src={"assets/imgs/icons/delete_cross.svg"} onClick={() => handleDeleteImage(key)}/></a></div>)
										}	
								</div>
								
							</div>
						</div>

						<hr/>
						
						<div className="row mt-10">
							<div className="col-3 d-flex justify-content-end">
								<label className="admin width-100">Categories:</label>
							</div>
							<div className="col-9">								
								<div className="">	 
									<select className="form-select" value={selectCategoryIds} multiple aria-label="multiple select example" size={10} onChange={handleCategoriesChange}>
										{categoryLists}
									</select>
									<p className ="form-validation-error">{isSubmit.current && formErrors.selectCategoryIds}</p>
								</div>								
							</div>
						</div>		
					</div>
					
					<div className="col-4 pt-4 mt-2 mb-20" style={{border: "1px solid #d3d3d3"}}>
					
					
						<div className="row">
							<div className="col-4 d-inline-flex justify-content-end">
								<label className="admin">Display:</label>
							</div>
							<div className="col-6 form-check d-inline-flex justify-content-left ">
								<input className="" type="checkbox" className="form-check-input ml-10" id="" checked={display} onChange={handleDisplayChange}/>
							</div>
						</div>	
					
					
						<div className="row">
							<div className="col-4 d-inline-flex justify-content-end">
								<label className="admin">SKU:</label>
							</div>
							<div className="col-6">	
								<input type="text" className="form-control ml-2" value={sku} 
								 placeholder="" onChange={handleSKUChange} />
								 <p className ="form-validation-error">{isSubmit.current && formErrors.sku}</p>
							</div>
						</div>	
						
						<div className="row mt-4">	
							<div className="col-4 d-inline-flex justify-content-end">
								<label className="admin">MRP:</label>
							</div>
							<div className="col-6">	
								<input type="text" className="form-control ml-2" value={mrp} 
								 placeholder="" onChange={handleMRPChange} />
							</div>	
						</div>

						<div className="row mt-4">	
							<div className="col-4 d-inline-flex justify-content-end">
								<label className="admin">HSN Code:</label>
							</div>
							<div className="col-6">	
								<input type="text" className="form-control ml-2" value={hsnCode} 
								 placeholder="" onChange={handleHSNCodeChange} />
							</div>	
						</div>

						<div className="row mt-4">	
							<div className="col-4 d-inline-flex justify-content-end">
								<label className="admin">GST:</label>
							</div>
							<div className="col-6">	
								<select className="form-select"  value={gst} size={4} onChange={handleGSTChange}>
									<option className="admin-options" value={0}> 0 </option>
									<option className="admin-options" value={5}> 5 </option>
									<option className="admin-options" value={12}> 12 </option>
									<option className="admin-options" value={18}> 18 </option>
								</select>
							</div>	
						</div>												
					</div>
				</div>
				
				<hr/>
						
				<div className="row mt-4">	
					<div className="col-2 d-inline-flex justify-content-end">
						<label className="admin">Sort Order:</label>
					</div>
					<div className="col-2">	
						<input type="text" className="form-control ml-2" value={sortOrder} 
						 placeholder="" onChange={handleSortOrderChange} />
					</div>	
				</div>
				
				<div className="row mt-4">	
					<div className="col-2 d-inline-flex justify-content-end">
						<label className="admin">Meta Title:</label>
					</div>
					<div className="col-6">	
						<input type="text" className="form-control ml-2" value={metaTitle} 
						 placeholder="" onChange={handleMetaTitleChange} />
					</div>	
				</div>
				
				<div className="row mt-4">	
					<div className="col-2 d-inline-flex justify-content-end">
						<label className="admin">Meta Description:</label>
					</div>
					<div className="col-6">	
						<textarea name="metadescription" className="form-control" rows="4" cols="50" value={metaDescription} onChange={handleMetaDescriptionChange} />
					</div>	
				</div>
				
				<div className="row mt-4">	
					<div className="col-2 d-inline-flex justify-content-end">
						<label className="admin">Meta Keywords:</label>
					</div>
					<div className="col-6">	
						<textarea name="metadescription" className="form-control" rows="4" cols="50" value={metaKeywords} onChange={handleMetaKeywordsChange}/>
					</div>	
				</div>
				
				<div className="row mt-4 mb-50">	
					<div className="col-2 d-inline-flex justify-content-end">
						<label className="admin">SEO URL:</label>
					</div>
					<div className="col-6">	
						<input type="text" className="form-control ml-2" value={seoURL} 
						 placeholder="" onChange={handleSEOUrlChange} />
					</div>	
				</div>

				
			</form>
		</div>	 
	
	</>	
)}


export default ComponentAddProduct;