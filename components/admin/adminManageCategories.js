import React from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import * as APIs from "./../../util/springAPIs";
//import { connect } from "react-redux";
//import { addCategoriesToStore, deleteCatFromStore } from "./../../redux/action/categories";


const ComponentManageCategories = () => {
	
	const [categories, setCategories] = useState(null);
	const [refresh, setRefresh] = useState(false);
    const router = useRouter();
	
	
	useEffect(() => {
	//If Categories data is not available in redux store, then only fetch data..	
		
//	const catUrl = "http://localhost:8083/api/categories"

	const catUrl = APIs.catUrl;
	
		const fetchData = async () => {
			try {
				const response = await fetch(catUrl);
				const json = await response.json();
				setCategories(json);
				} 
			catch (error) {
				alert("From adminViewCategories: fetching categories, Server-side error. Please try later.")
			}			
		}			
		fetchData(); 			
		
	},[refresh]);
	
	console.log(categories)
	
	const deleteCategory = (e) => {
		
	//	const delCatUrl = "http://localhost:8083/api/categories/" + e; 
		
		const delCatUrl = APIs.delCatUrl + e; 
		
		const delData = async () => {
            try {
                const response = await fetch(delCatUrl,{ method: 'DELETE' });
           //     const json = await response.json();
				
				if(!response.ok){
					alert("HTTP error. Please try later.")
				}
				else {			
					setRefresh(!refresh);	
				}
                
			} 
			catch (error) {
				alert("HTTP/network error. Please try later.")
			}			
		}			
		delData(); 
		
	}

	
	let categoriesData = [];
	
	if(categories != null && categories.length > 0) {

	 	for(let x in categories) {				
			const parentCategoryName ="";		
			for(let y in categories){			
				if(categories[y].categoryId==categories[x].parentCategoryId) {
					parentCategoryName = categories[y].categoryName 
				}		
			}		
								
			 categoriesData.push(<tr> <td> {categories[x].categoryId} </td> <td> {categories[x].categoryName} </td> <td> {parentCategoryName} </td>
								<td> <div className="text-center"><a onClick={()=> deleteCategory(categories[x].categoryId)}><img src="/assets/imgs/icons/file-x.svg"></img></a> </div> </td></tr>);   
		} 
	}	
	
return(
<>

	<div className="container">
		<div className ="row mt-60">
			<div className="col-md-1"> </div>
				<div className="col-md-6 ">

				<table mt-20>
				<thead>
					<tr> <th>Category Id</th> <th>Category Name</th> <th> Parent Category</th> <th> Delete </th></tr>
				</thead>	
				<tbody>
					{categoriesData} 
				</tbody>	
				</table>
			</div>
		</div>
	</div>



</>		
)}





export default ComponentManageCategories;