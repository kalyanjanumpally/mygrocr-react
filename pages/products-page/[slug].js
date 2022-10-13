import { useRouter } from "next/router";
import Router from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "./../../components/ecommerce/Pagination";
import SingleProduct from "./../../components/ecommerce/SingleProduct";
import Layout from "./../../components/layout/Layout";
import { addProductsInReduxState } from "./../../redux/action/productsInfo";


const ProductsPageSlug = ({addProductsInReduxState}) => {

    let router = useRouter(),
        searchTerm = router.query.search;

	let showLimit = 30,
        showPagination = 4;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
   // let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
	let [pages, setPages] = useState(Math.ceil(3));
    let [currentPage, setCurrentPage] = useState(1);
	const [productsInCat, setProductsInCat] = useState(null); 

	
	const productsArray = [];

    useEffect(() => {
		
		if (!(router.query.slug == null)) {
		
			const menuUrl = "http://localhost:8083/api/search-products-and-batches-by-category/" + router.query.slug + "/" + 2 + "/" + 0;

			 const fetchData = async () => {
				try {
					const response = await fetch(menuUrl);
					const json = await response.json();
					
				//	console.log("data fetched:")			
				//	console.log( JSON.stringify(json))
					
				//	addProductsInReduxState(json);
					setProductsInCat(json.dtos);
			
				} catch (error) {
					Router.push("/404");				
				}			
			}
						
			fetchData(); 			
			cratePagination();
		}
		
    }, [limit, pages, router.query.slug]); 
		
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
	
//	console.log("Paginated Products:")
//	console.log(JSON.stringify(getPaginatedProducts));

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
	
	const tempItem = [];

     return (
        <>
            <Layout noBreadcrumb="d-none">

                <section className="mt-50 mb-50">
                    <div className="container mb-30">  
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                            
                                <div className="row product-grid">
                               
                                    {getPaginatedProducts.map((product, key) => (
										<div
                                            className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                            key={key}
                                        >
												<SingleProduct product={product.product} batches={product.batchesData} /> 
                                           
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

				{/* <QuickView />  */}
                
            </Layout>
        </>
    );   
	 
};

 const mapStateToProps = (state) => ({
		//cartItems: state.cart,
});
 
 
const mapDispatchToProps = {
//    addToCompare,
//    addToWishlist,
//    addToCart,
//    increaseQuantity,
//    decreaseQuantity,
	addProductsInReduxState,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPageSlug);

