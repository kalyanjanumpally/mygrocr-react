import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Search from "../ecommerce/Search";
import products from "../../pages";
import { useRouter } from 'next/router'  
import fetchData from "../../util/fetchApiData";  
import DropDownItems from "../ecommerce/dropDown";  
import MenuClick from "../ecommerce/menuItems"; 

import menuItems from '../admin/menuItems';
import MenuItemsComponent from '../admin/menuItemsComponent';




const Header = ({ totalCartItems, totalCompareItems, toggleClick, totalWishlistItems }) => {
    
	const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);	
	const [categories, setCategories] = useState(null);
	const [organicGroceriesTab, setOrganicGroceriesTab] = useState(false);
	

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });  
		
		const menuUrl = "http://localhost:8083/api/categories";

        const fetchData = async () => {
            try {
                const response = await fetch(menuUrl);
                const json = await response.json();
                setCategories(json);
            } catch (error) {
                console.log("error", error);
            }			
		}			
		fetchData(); 			
	},[]); 

	
	function menuClick(e, catId) {
	    e.preventDefault();

	    const menuUrl = "http://localhost:8083/api/products";

	    const fetchData = async() => {
	        try {
	            const response = await fetch(menuUrl);
	            const json = await response.json();
	        } catch (error) {
	            console.log("error", error);
	        }
	    }
	    fetchData();
	}
  
	const menuItemNames = [];
	
/* 	for (let x in categories) {				
		const condition = false;
				
		if(categories[x].categoryName == "Organic Groceries"){
			condition = true;
		}							
		menuItemNames.push(<li key={x}><Link href="/products-page/[slug]" as={`/products-page/${categories[x].categoryId}`}><a> 
							{categories[x].categoryName} <i className="fi-rs-angle-down"></i></a></Link>
							{ condition && <ul className="sub-menu"><DropDownItems catId={categories[x].categoryId}/></ul>} </li>); 
	}	 */
	
	const handleOrganicGroceriesMouseEnter = () => {
		
		setOrganicGroceriesTab(true);
		
	}
	
	const handleOrganicGroceriesMouseLeave = () => {
		
		setOrganicGroceriesTab(false);
		
	}
	
	
	
	/*
		
	menuItemNames[0] = <li key={0}><Link href="/"><a> HOME <i className="fi-rs-angle-down"></i></a></Link></li>;
	
	menuItemNames[1] = <li key={1}><Link href="/"><a> FRUITS & VEGETABLES <i className="fi-rs-angle-down"></i></a></Link></li>;
	
	menuItemNames[2] = <li key={2}><Link href="/"><a> HEALTH & NUTRITION </a></Link></li>;
	menuItemNames[3] = <li className="website-menubar" style={{border:"1px solid #000000"}} onMouseEnter={handleOrganicGroceriesMouseEnter}  onMouseLeave={handleOrganicGroceriesMouseLeave} style={{position:"relative"}} key={3}>
						 ORGANIC GROCERIES    <i className="fi-rs-angle-down"></i> </li>;
	menuItemNames[4] = <li key={4}><Link href="/"><a> SWEETENERS </a></Link></li>;
	menuItemNames[5] = <li key={5}><Link href="/"><a> ROCK SALT </a></Link></li>;
	menuItemNames[6] = <li key={6}><Link href="/"><a> BREAKFAST <i className="fi-rs-angle-down"></i></a></Link></li>;
	menuItemNames[7] = <li key={7}><Link href="/"><a> HEALTHY SNACKS <i className="fi-rs-angle-down"></i></a></Link></li>;
	menuItemNames[8] = <li key={8}><Link href="/"><a> A2 MILK PRODUCTS </a></Link></li>;
	menuItemNames[9] = <li key={9}><Link href="/"><a> PERSONAL CARE <i className="fi-rs-angle-down"></i></a></Link></li>;
	menuItemNames[10] = <li key={10}><Link href="/"><a> HOUSEHOLD <i className="fi-rs-angle-down"></i></a></Link></li>;
	menuItemNames[11] = <li key={11}><Link href="/"><a> ABOUT US </a></Link></li>;
	menuItemNames[12] = <li key={12}><Link href="/"><a> CONTACT US </a></Link></li>;
	menuItemNames[13] = <li key={13}><Link href="/blog-category-list"><a> BLOG </a></Link></li>;
	menuItemNames[14] = <li key={14}><Link href="/"><a> OUTLET </a></Link></li>;
	

	
	const dropDownItems =	<div className= { organicGroceriesTab ? "tab-pane fade active show" : "d-none "}  >	
							<ul className="flex-column website-menubar-dropdown" role="tablist" >
								<li > 				
										<Link href="/products-page/1">Special Fresh Deliveries</Link>								
								</li>								
								<li > 
										<Link href="/products-page/2">Organic Rice</Link>										
								</li>
								<li > 		
										<Link href="/products-page/3">Organic Wheat</Link>									
								</li>
								<li > 		
										<Link href="/products-page/4">Organic Millets & Others</Link>									
								</li>
								<li > 		
										<Link href="/products-page/5">Organic Flours</Link>									
								</li>
							</ul> 
						</div>	; */
	
	

    const handleToggle = () => setToggled(!isToggled);

    return (
        <>
		
            <header className="header-area header-style-1 header-height-2">
          {/*   <div className="mobile-promotion">
					<span>
                        Grand opening, <strong>up to 15%</strong> off all items.
                        Only <strong>3 days</strong> left
					</span> 
                </div>  */} 
                <div className="header-top header-top-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info">
                                    <ul>
                                        <li>
                                            <Link href="/page-about">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-account">
                                                <a>My Account</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-4">
                                <div className="text-center">
                                    <div
                                        id="news-flash"
                                        className="d-inline-block"
                                    >
                                        <ul>
                                            <li>
                                                
                                                <Link href="/shop-grid-right">
                                                    <a> Eat Organic, Stay Fit! Deliveries in Pune.</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info header-info-right">
                                    <ul>
                                        <li>
                                            Call Us:{" "}
                                            <strong className="text-brand">
                                                {" "}
                                                8010778229
                                            </strong>
                                        </li>
                       
                                    </ul> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="header-wrap">
						   <div className="logo logo-width-1">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/assets/imgs/theme/swap4pure_logo.jpg"
                                            alt="logo"
                                        />
                                    </a>
                                </Link>
						</div> 
                            <div className="header-right">
                                <div className="search-style-2">
                                    <Search />
                                </div>
                                <div className="header-action-right">
                                    <div className="header-action-2">
                                        <div className="header-action-icon-2">
                                            <Link href="/shop-cart">
                                                <a className="mini-cart-icon">
                                                    <img
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-cart.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalCartItems}
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-cart">
                                                <a>
                                                    <span className="lable">
                                                        Cart
                                                    </span>
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="header-action-icon-2">
                                            <Link href="/page-account"><a>
                                                <img
                                                    className="svgInject"
                                                    alt="Nest"
                                                    src="/assets/imgs/theme/icons/icon-user.svg"
                                                />
                                            </a></Link>
                                            <Link href="/page-account"><a>
                                                <span className="lable ml-0">
                                                    Account
                                                </span>
                                            </a></Link>
                                            <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                                <ul>
                                                    <li>
                                                        <Link href="/page-account">
                                                             <a>
                                                                <i className="fi fi-rs-user mr-10"></i>
                                                                My Account
                                                            </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-account"><a>
                                                            <i className="fi fi-rs-location-alt mr-10"></i>
                                                            Order Tracking
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-account"><a>
                                                            <i className="fi fi-rs-label mr-10"></i>
                                                            My Voucher
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-wishlist"><a>
                                                            <i className="fi fi-rs-heart mr-10"></i>
                                                            My Wishlist
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-account"><a>
                                                            <i className="fi fi-rs-settings-sliders mr-10"></i>
                                                            Setting
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-login"><a>
                                                            <i className="fi fi-rs-sign-out mr-10"></i>
                                                            Sign out
                                                        </a></Link>
													</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        scroll
                            ? "header-bottom header-bottom-bg-color sticky-bar stick"
                            : "header-bottom header-bottom-bg-color sticky-bar"
                    }
                >
				
				{/*
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative">
						
							 <div className="header-nav d-none d-lg-flex">
                                 <div className="main-menu main-menu-padding-1 main-menu-background main-menu-lh-2 d-none d-lg-block  font-heading"> 								 
                                    <nav>
                                        <ul className="menus">											
											{menuItems.map((menu, index) => {
												return <MenuItemsComponent items={menu} key={index} />;
											})}											
                                        </ul>
                                    </nav>
                                 </div> 
                            </div> 
                        </div>
                    </div>
				*/}	
							<header>
								<div className="nav-area">					
					                <nav>
                                        <ul className="menus">											
											{menuItems.map((menu, index) => {
												const depthLevel = 0;
												return <MenuItemsComponent items={menu} key={index} depthLevel={depthLevel}/>;
											})}											
                                        </ul>
                                    </nav>
								</div>
							</header>	
					
					
                </div>
            </header>
        </>
    );
};


 

const mapStateToProps = (state) => ({
    totalCartItems: state.cart.length,
    totalCompareItems: state.compare.items.length,
    totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);