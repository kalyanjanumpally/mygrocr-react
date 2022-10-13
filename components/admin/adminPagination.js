import React from "react";
import { useState } from "react";
// import "./styles.css";

function Pagination({
    prev,
    currentPage,
    paginationGroup,
    next,
    pages,
    handleActive,
	selectChange,
}) {	
	
	const handleNewItemsPerPage = (e) => {								
		if (e.key === "Enter") {
			e.preventDefault();
			selectChange(e.target.value);
		}		
	}
	
    return (
        <>
			<div className="row">
				<div className="col-12 d-flex justify-content-center align-items-center">
					<ul className="pagination justify-content-start">
						{paginationGroup.length <= 0 ? null : (
							<li onClick={prev} className="page-item">
								{currentPage === 1 ? null : (
									<a className="page-link">
										<i className="fi-rs-angle-double-small-left"></i>
									</a>
								)}
							</li>
						)}

						{paginationGroup.map((item, index) => {
							return (
								<li
									onClick={() => handleActive(item)}
									key={index}
									className={
										currentPage === item
											? "page-item active"
											: "page-item"
									}
								>
									<a className="page-link">{item}</a>
								</li>
							);
						})}

						{paginationGroup.length <= 0 ? null : (
							<li onClick={next} className="page-item">
								{currentPage >= pages ? null : (
									<a className="page-link">
										<i className="fi-rs-angle-double-small-right"></i>
									</a>
								)}
							</li>
						)}
					</ul>

					{paginationGroup.length <= 0 ? null : (
						<p className="ml-20">
							Page {currentPage} of {pages}
						</p>
					)}  
					
					<label className="ml-20"> Rows per Page: </label>
					<input className="" style={{height:"25px", width:"40px", borderRadius:"0px", fontSize:"13px", backgroundColor:"#ffffff"}}  type="text"	onKeyDown = {handleNewItemsPerPage} />
					
					
					
				</div>	
			</div>
        </>
    );
}

export default Pagination;
