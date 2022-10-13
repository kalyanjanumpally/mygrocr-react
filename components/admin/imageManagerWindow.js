import Link from "next/link";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable';
import Pagination from "./adminPagination";
import * as APIs from "./../../util/springAPIs";


const ImageManagerWindow = ({openImagesManager, setOpenImagesManager, images, setImages}) => {

	const [dbImages, setDbImages] = useState([]);
	const [imageAdded, setImageAdded] = useState(false);
	const [search, setSearch] = useState("");
	const [imageSearchActive, setImageSearchActive] = useState(false);
	const [imageSearchToggle, setImageSearchToggle] = useState(false);
	
	//Pagination related state variables..............
		
    const [itemsPerPage, setItemsPerPage] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [pagination, setPagination] = useState([]);
	
	const showPagination = 5;	
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
	
	useEffect(() => {
		if(imageSearchActive == false ){
		//	const imagesUrl = "http://localhost:8083/api/images/" + itemsPerPage + "/" + startIndex;
			
			const imagesUrl = APIs.imagesUrl + itemsPerPage + "/" + startIndex;
			
			const fetchImages = async () => {
				try {
					const response = await fetch(imagesUrl);
					const json = await response.json();

					setDbImages(json.images);					
					if(startIndex == 0) {
						initiatePagination(json.countOfImages, itemsPerPage);
					}					
				} 
				catch (error) {
					alert("Server-side error. Please try later.")
				}			
			}			
			fetchImages(); 	
		}
	}, [imageAdded, currentPage, imageSearchToggle]);
	
	
	useEffect(() => {		
		if(imageSearchActive == true){	
		
		//	const imagesSearchUrl = "http://localhost:8083/api/search-images/" + search + "/" + itemsPerPage + "/" + startIndex;
			
			const imagesSearchUrl = APIs.imagesSearchUrl + search + "/" + itemsPerPage + "/" + startIndex;
			
			const fetchSearchedImages = async () => {
				try {
					const response = await fetch(imagesSearchUrl);
					const json = await response.json();

					setDbImages(json.images);					
					if(startIndex == 0) {
						initiatePagination(json.countOfImages, itemsPerPage);
					}
					console.log(json)
				} 
				catch (error) {
					alert("Server-side error. Please try later.")
				}			
			}			
			fetchSearchedImages(); 
		}
	}, [currentPage, imageSearchToggle]);	
	
	
	const handleImageSearch = (e) => {		
		if(e.key == "Enter" && search.length > 0) {	
			setImageSearchToggle(!imageSearchToggle);
			setImageSearchActive(true);
			setCurrentPage(1);
		}
		else if(e.key == "Enter" && search.length == 0) {
			setImageSearchToggle(!imageSearchToggle);
			setImageSearchActive(false);
			setCurrentPage(1);
		}
	}	


    const handleRemove = () => {  
	   setOpenImagesManager(false);   
    };	

	const handleClick = (image) => {
		setImages([...images, image]);
		setOpenImagesManager(false);
	}
	
	const onImageUploadRequest = (e) => {
				
		const saveImagesUrl = "http://localhost:8083/api/images"; 
			
			const formData = new FormData();
			formData.append("file",e.target.files[0]);	
			
			const requestOptionsImagesUpload = {
				 method: 'POST',
				 body: formData
			};
			
			const saveNewImage = async () => {
				try {
					const response = await fetch(saveImagesUrl, requestOptionsImagesUpload);
					
					if(!response.ok) {
						alert("HTTP Error. Please try later.");
					}
					else {	
						try{
							const jsonImage = await response.json();
							if(jsonImage[0] != null) {
								setDbImages([jsonImage, ...dbImages])
								setImageAdded(!imageAdded)
							}
						}	
						catch {
						}	
					}
				}
				catch (error) {
					console.log("error: "+ error)
					alert("HTTP/Network error. Please try later.");
				}					
			} 			
		saveNewImage();	

		
	//	setDbImages([...dbImages]);		
	}
		 	
	const imagesDisplay = [];
	
	if(dbImages.length > 0) {	
		dbImages.map(			
			(image,index) => {			
				imagesDisplay.push(
				<div className = "image-manager-outer d-flex flex-column justify-content-between align-items-center my-2">
					{<a onClick={() => handleClick(image)}>
						<img className="px-3 py-3 image-manager-img" src={image.imageUrl}/>						
					</a>}
					<label className=" disp-img-text mx-2" >  {image.imageName} </label>
				</div>
				);	
			}		
		)		
	}
	
	// Pagination Code Begins...................................................................	

//	let paginatedOrders = dtoOrders.slice(startIndex, endIndex);
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
     /*   setItemsPerPage(Number(newItemsPerPage));
        setCurrentPage(1);
		
		if(Object.keys(dtoOrders).length > 0 && reportType == "order-wise" && searchActive == false) {
			setPages(Math.ceil(dtoOrders.length / Number(newItemsPerPage))); 
			initiatePagination(dtoOrders.length, newItemsPerPage);
		} 
		else if(Object.keys(dtoOrders).length > 0 && reportType == "item-wise" && searchActive==false){
			setPages(Math.ceil(itemsList.size / Number(newItemsPerPage))); 
			initiatePagination(itemsList.size, newItemsPerPage); 
		} */
    };  
	
	// Pagination Code Ends...................................................................


    return (
        <>
		{/*	<Draggable> */}
			<div className="modal custom-modal-images d-block">
                <div className="modal-dialog modal-dialog-scrollable" style={{backgroundColor:"#ffffff"}}>
                    <div className="modal-content pt-0 pb-1" >
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleRemove}
                        ></button>
						
						<div className="modal-header py-0">
							<h5 className="modal-title py-0">Images Manager</h5>
						</div>
					
					
                        <div className="modal-body admin-modal py-0">	 
							
							<div className="d-flex justify-content-center">
								
								<input className="form-control form-control-lg mt-5 hidden" id="upload-image" type="file" accept="image/*" onChange={onImageUploadRequest} />
								<label className="admin-upload-image text-center" for="upload-image">BROWSE</label>							
							</div>
							
							<hr className="py-0"/>
							
							<div className="d-flex justify-content-center">
							
							  	<input type="text" className="mr-20" style={{width:"200px", height:"30px", borderRadius:"1px", border:"1px solid #000000"}} value={search} placeholder="search" 
									onChange={(e) => setSearch(e.target.value)} onKeyDown={handleImageSearch} />
									
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
												
							</div>
		
							<hr className="py-0"/>
							
							<div>
								<div className="d-inline-flex flex-wrap" >
									{imagesDisplay} 
								</div>
							
							</div>
							
                        </div>						
                    </div>
                </div>
			</div>	
			{/*	</Draggable> */}
        </>
    );
};


const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageManagerWindow);