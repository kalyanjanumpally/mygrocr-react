import Link from "next/link";
import React from "react";
import Layout from "../components/layout/Layout";
import data from "../util/storeData";



const Blank = () => {
    return (
        <>
            <Layout pageclassName="pageclass" parent="Home" child="Stores">
                <div className="page-content pt-50">
                    <div className="container">
                        <div className="archive-header-2 text-center">
                            <h1 className="display-2 mb-50">Vendors List</h1>                           
                        </div>

                        <div className="row vendor-grid">
                            {data.map((item, i) => (
                                <>
                                    <div className="col-lg-3 col-md-6 col-12 col-sm-6">
                                        <div className="vendor-wrap mb-40">
                                            <div className="vendor-img-action-wrap">
                                                <div className="vendor-img">
                                                <Link href="/vendor/1"><a>
                                                        <img className="default-img" src={`assets/imgs/vendor/${item.img}`} alt="" />
                                                    </a></Link>
                                                </div>
                                                <div className="product-badges product-badges-position product-badges-mrg">
                                                    <span className="hot">Mall</span>
                                                </div>
                                            </div>
                                            <div className="vendor-content-wrap">
                                                <div className="d-flex justify-content-between align-items-end mb-30">
                                                    <div>
                                                        <div className="product-category">
                                                            <span className="text-muted">Since 2012</span>
                                                        </div>
                                                        <h4 className="mb-5">
                                                            <Link href={`vendor/${item.id}`}><a>{item.title}</a></Link></h4>

												{/*   	<div className="product-rate-cover">
                                                            <div className="product-rate d-inline-block">
                                                                <div className="product-rating" style={{ "width": "90%" }}></div>
                                                            </div>
                                                            <span className="font-small ml-5 text-muted"> (4.0)</span>
														</div> */}
                                                    </div>

                                                    <div className="mb-10">
                                                        <span className="font-small total-product">380 products</span>
                                                    </div>
                                                </div>

                                                <Link href={`vendor/${item.id}`}><a className="btn btn-xs">Visit Store <i className="fi-rs-arrow-small-right"></i></a></Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
						
						{/* This part below is pagination */}
						
						
                        <div className="pagination-area mt-20 mb-20">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-start">
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fi-rs-arrow-small-left"></i></a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link dot" href="#">...</a></li>
                                <li className="page-item"><a className="page-link" href="#">6</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#"><i className="fi-rs-arrow-small-right"></i></a>
                                </li>
                            </ul>
                        </nav>
						</div>
                    </div>
                </div>


            </Layout>
        </>
    );
};

export default Blank;