import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import  { addToCart } from "../../redux/action/cart";
import { openQuickView } from "../../redux/action/quickViewAction";


const SingleProduct = (
    { 
	  product,
	  batches,	  
	  addToCart
  //   openQuickView
}) => {
	
	const productQuantity = 0;
	const productMrp = 0;

	for(let x in batches) {		
		productQuantity = productQuantity + parseInt(batches[x].quantity);
	}
	
	for(let x in batches) {		
		if(productMrp < parseInt(batches[x].mrp)) {
			productMrp = parseInt(batches[x].mrp);
		}
	}
	
	    const handleCart = (product) => {
		//	const tempProduct = [];
		//	tempProduct[0] = product;
		//	product = tempProduct;
		
		//	product[0].productQuantity=1;
		//	console.log("From handlecart, product: " + JSON.stringify(product))				        
	        addToCart(product);
			toast("Product added to Cart !");

	    };
		
		   return (
        <>
            <div className="product-cart-wrap mb-30">
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
					   <Link href={"/single-products/" +  product.productId}> 
                            <a>
                                <img
                                    className="default-img"
                                    src={product.images[0].imageUrl}
                                    alt=""
                                />
                            </a>
					  </Link> 
                    </div>



                </div>
                <div className="product-content-wrap">
                    
                    <h2>
				   <Link  href={"/single-products/" +  product.productId} >    
                            <a>{product.productName}</a>
					</Link>  
                    </h2>
					
					<div>
                        <span className="font-small text-muted">
								{product.brand.brandName} 
                        </span>
					</div>  				
																			

                    <div className="product-card-bottom">
                        <div className="product-price">
						   <span>Rs.{productMrp} </span> 
                        </div>

						<div className={productQuantity >0 ? null : "d-none"}>	
							<div className="add-cart ">
								<a
									className="add"
									onClick={(e) => handleCart(product)}
								>
									<i className="fi-rs-shopping-cart mr-5"></i> Add
								</a>
							</div>
						</div>
						<div className={productQuantity <0 ? null : "d-none"}> 
							<div className="add-cart">
								<a
									className="add"
								>
									<i className="fi-rs-shopping-cart mr-5"></i> Out Of Stock 
								</a>
							</div>
						</div>  
                    </div>
                </div>
            </div>
        </>
		);  
	


};



const mapDispatchToProps = {
    addToCart
//    openQuickView
};

export default connect(null, mapDispatchToProps)(SingleProduct);
