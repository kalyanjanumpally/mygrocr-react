import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShowSelect from "../../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../../components/ecommerce/Filter/SortSelect";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
//import CategoryProduct from "./../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "./../../components/ecommerce/Filter/PriceRangeSlider";
import SizeFilter from "./../../components/ecommerce/Filter/SizeFilter";
import VendorFilter from "./../../components/ecommerce/Filter/VendorFilter";
import Pagination from "./../../components/ecommerce/Pagination";
//import QuickView from "./../../components/ecommerce/QuickView";
import SingleProduct from "./../../components/ecommerce/SingleProduct";
import Layout from "./../../components/layout/Layout";
//import { fetchProduct } from "./../redux/action/product";


const ProductsPage = () => {


    let Router = useRouter(),
        searchTerm = Router.query.search;
		
    let showLimit = 30,
        showPagination = 4;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
   // let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
   let [pages, setPages] = useState(Math.ceil(3));
    let [currentPage, setCurrentPage] = useState(1);
	const [productsInCat, setProductsInCat] = useState(null); 

    useEffect(() => {
		
		const menuUrl = "http://localhost:8083/api/productsincat/2";

         const fetchData = async () => {
            try {
                const response = await fetch(menuUrl);
                const json = await response.json();
				setProductsInCat(json);
				
            } catch (error) {
                console.log("error", error);
            }			
		}			
		fetchData(); 

        cratePagination();
    }, [limit, pages]); 
	
	
	const productsArray = [];
	
	for(let x in productsInCat) {		
		productsArray.push(productsInCat[x])		
	}

	

    const cratePagination = () => {
        // set pagination
        let arr = new Array(Math.ceil(productsArray.length / limit))
            .fill()
            .map((_, idx) => idx + 1);  //   the underscore is just a placeholder for value which is not used in the function, you can put any name there.

        setPagination(arr);
        setPages(Math.ceil(productsArray.length / limit));
    };

	
    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
	const getPaginatedProducts = productsArray.slice(startIndex, endIndex);
	

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(productsNos / Number(e.target.value)));
    };  
	
	
     return (
        <>
            <Layout noBreadcrumb="d-none">
            <Breadcrumb2/>
                <section className="mt-50 mb-50">
                    <div className="container mb-30">  
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                            
                                <div className="row product-grid">
                               

                                    {getPaginatedProducts.map((item, i) => (
                                        <div
                                            className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                            key={i}
                                        >
												<SingleProduct product={item} /> 
                                           
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="Page navigation example">
											<Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
											/>  
                                    </nav>
                                </div>
                            </div>
					
                        </div>
                    </div>
                </section>

				{/*       <QuickView />   */}
                
            </Layout>
        </>
    );  
	 
	 
	 
};


export default ProductsPage;
