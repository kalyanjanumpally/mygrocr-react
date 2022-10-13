import Link from "next/link";
import { useState } from "react";

const IntroPopup = () => {
    const [openClass, setOpenClass] = useState(0);

    const handleRemove = () => {
        setOpenClass(!openClass);
    };

    return (
        <>
             <div
                className={
                    openClass
                        ? "modal fade custom-modal d-none"
                        : "modal fade custom-modal  show d-block"
                }
			> 
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleRemove}
                        ></button>
						
						<div class="modal-header">
							<h5 class="modal-title">Modal title</h5>
				{/* 		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							  <span aria-hidden="true">&times;</span>
				</button> */}
						  </div>
						
                        <div className="modal-body">			
     
                           
                        </div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-primary">Save</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
						 </div>

						
						
						
						
						
                    </div>
                </div>
			</div> 

            <div
                className={
                    openClass
                        ? "modal-backdrop fade d-none"
                        : "modal-backdrop fade show"
                }
            ></div>
        </>
    );
};

export default IntroPopup;
