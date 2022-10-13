import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import Link from "next/link"
import SingleProduct from "../ecommerce/SingleProduct";


function CategoryTab() {
    const [catAll, setCatAll] = useState([]);

    const catPAll = async () => {
        const request = await fetch(`${server}/static/product.json`);
        const allProducts = await request.json();
		setCatAll(allProducts);
    };
	
	const showItem= 3;
    
    useEffect(() => {
        catPAll();
    }, []);

    return (
        <>		
			<div className="text-center pt-40">			
				<h2 > SWAP4PURE RECOMMENDS! </h2>		
			</div>
		
            <div className="tab-content wow fadeIn animated">
                <div className= "tab-pane fade show active">
                    <div className="product-grid-4 row">							
						{catAll.slice(0, showItem).map((product, i) => (
							<div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
								<SingleProduct product={product} />
							</div>
                        ))}						
                    </div>
                </div>

 
            </div>
        </>
    );
}
export default CategoryTab;
