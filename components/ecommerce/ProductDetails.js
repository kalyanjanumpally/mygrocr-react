import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/ThumbSlider";

const ProductDetails = ({
	productAndBatches,
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity
  //  quickView,
}) => {
	
	const [quantity, setQuantity] = useState(1);
	
	const product = productAndBatches.product;
	const batches = productAndBatches.batchesData;
	
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
	
	
	console.log("Product in ProductDetailsComponent: " + JSON.stringify(product))
	
	{/*	for (let x in product) {
		
	productId = product[x].productId;
	productName = product[x].productName;
	productQuantity = product[x].productQuantity;
	hasBatch = product[x].hasBatch;
	productMrp = product[x].productMrp;
	brand = product[x].brand;
	brandName = product[x].brandName;
	} */}

	

     const handleCart = (product) => {

	//	for (let x in product) {product[x].productQuantity = quantity || 1; }
	//	console.log("From Handle Cart, quantity: " + JSON.stringify(product))
	//	console.log("From Handle Cart, quantity: " + product.productQuantity)
        addToCart(product);
        toast("Product added to Cart !");
    };

 //   const inCart = cartItems.find((cartItem) => cartItem.productId === productId); 

		 return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50  mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>

                                            <div className="product-image-slider">
											   <ThumbSlider product={product} />  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info  pr-30 pl-30">
                                            <h2 className="title-detail"> {product.productName}</h2>
                                        {/* <div className="product-detail-rating">
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ width: "90%" }}></div>
													</div>
                                                </div>
                                            </div>  */}
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">Rs. {productMrp}</span>
                                                </div>
                                            </div>

                                            <div className="short-desc mb-30">
											  <p className="font-lg">{product.productName}</p>                
                                            </div>
											
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
												<div className="detail-extralink">   
													<div className="detail-qty border radius">
														<a onClick={ (e) => (setQuantity(quantity > 1 ? quantity - 1 : 1)) } className="qty-down">
														<i className="fi-rs-angle-small-down"> </i>  </a>  
                                                     
														<span className="qty-val">{quantity}</span>

														<a onClick={() => (setQuantity(quantity + 1)) } className="qty-up">
                                                        <i className="fi-rs-angle-small-up"></i>
														</a> 
													</div> 													

													<div className="product-extra-link2">
														<button onClick= {(e) => handleCart(product)}  className="button button-add-to-cart">											
															Add to cart
														</button>    
													</div>
												</div>
											</div>
										</div>
									</div>

								{/*   {quickView ? null : (
                                    <>
								   <ProductTab />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">Related products</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
 
};

export default ProductDetails;
