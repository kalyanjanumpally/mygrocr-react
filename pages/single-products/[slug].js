import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";
import { useRouter } from "next/router";
//import Router from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
//import { addProductsInReduxState } from "./../../redux/action/productsInfo";

const SingleProductPage = () => {
	
	let [product, setProduct] = useState(null);
 	let router = useRouter();

 	useEffect(() => {
		
	if (!(router.query.slug == null)) {
	
			const menuUrl = "http://localhost:8083/api/products/" + router.query.slug;

			const fetchData = async() => {
				try {
					const response = await fetch(menuUrl);
					const json = await response.json();

					console.log("product details, data fetched: ")
					console.log(json)

					setProduct(json);

				} catch (error) {
					console.log("Error: ", error);
					 
				}
			}
			fetchData();
		}
	}, [router.query.slug])
	
	if(product == null) {	
		return null;
	//	Router.push("/404");
	}
	else {
	    return (
	         <>
	         <Layout parent = "Home" sub = "Shop" subChild = {product.productName}>
				<div className = "container">
					<ProductDetails productAndBatches={product}/> 
				</div>
	         </Layout>
	         </>);
	}

};

export default SingleProductPage;
