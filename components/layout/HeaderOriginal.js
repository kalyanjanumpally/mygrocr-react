import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import Search from "../ecommerce/Search";

const Header = ({
    totalCartItems,
    totalCompareItems,
    toggleClick,
    totalWishlistItems,
}) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
    });

    const handleToggle = () => setToggled(!isToggled);

    return (
        <>
            <header className="header-area header-style-1 header-height-2">
                <div className="mobile-promotion">
                    <span>
                        Grand opening, <strong>up to 15%</strong> off all items.
                        Only <strong>3 days</strong> left
                    </span>
                </div>
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
                                        <div className="search-location">
                                            <form action="#">
                                                <select className="select-active">
                                                    <option>
                                                        Your Location
                                                    </option>
                                                    <option>Alabama</option>
                                                    <option>Alaska</option>
                                                    <option>Arizona</option>
                                                    <option>Delaware</option>
                                                    <option>Florida</option>
                                                    <option>Georgia</option>
                                                    <option>Hawaii</option>
                                                    <option>Indiana</option>
                                                    <option>Maryland</option>
                                                    <option>Nevada</option>
                                                    <option>New Jersey</option>
                                                    <option>New Mexico</option>
                                                    <option>New York</option>
                                                </select>
                                            </form>
                                        </div>
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
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative">
                            <div className="logo logo-width-1 d-block d-lg-none">
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/assets/imgs/theme/logo.svg"
                                            alt="logo"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav d-none d-lg-flex">
                                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                                    <nav>
                                        <ul>
										{/* <li>
                                                <Link href="/">
                                                    <a className="active">
                                                        Home
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/">
                                                            <a>Home 1</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-2">
                                                            <a>Home 2</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-3">
                                                            <a>Home 3</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-4">
                                                            <a>Home 4</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/page-about">
                                                    <a>About</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/shop-grid-right">
                                                    <a>
                                                        Shop
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                Shop Grid –
                                                                Right Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/products">
                                                            <a>
                                                                Shop Grid – Left
                                                                Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-list-right">
                                                            <a>
                                                                Shop List –
                                                                Right Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-list-left">
                                                            <a>
                                                                Shop List – Left
                                                                Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-fullwidth">
                                                            <a>Shop - Wide</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-filter">
                                                            <a>Shop - Filter</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-wishlist">
                                                            <a>
                                                                Shop – Wishlist
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-cart">
                                                            <a>Shop – Cart</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-checkout">
                                                            <a>
                                                                Shop – Checkout
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-compare">
                                                            <a>
                                                                Shop – Compare
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul>
											</li>  

                                            <li>
                                                <a href="#">Vendors <i className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><Link href="/vendors"><a>Vendors Grid</a></Link></li>
                                                    <li><Link href="/vendors-list"><a>Vendors List</a></Link></li>
                                                    <li><Link href="/vendor-dashboard"><a>Vendor Dashboard</a></Link></li>
                                                    <li><Link href="/vendor-guide"><a>Vendor Guide</a></Link></li>
                                                </ul>
                                            </li>

                                            <li className="position-static">
                                                <Link href="/#">
                                                    <a>
                                                        Mega menu
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="mega-menu">
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Fruit & Vegetables
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Meat &
                                                                    Poultry
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Fresh
                                                                    Vegetables
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Herbs &
                                                                    Seasonings
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Cuts &
                                                                    Sprouts
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Exotic
                                                                    Fruits &
                                                                    Veggies
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Packaged
                                                                    Produce
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Breakfast & Dairy
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Milk &
                                                                    Flavoured
                                                                    Milk
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Butter and
                                                                    Margarine
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Eggs
                                                                    Substitutes
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Marmalades
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Sour Cream
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Cheese
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Meat & Seafood
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Breakfast
                                                                    Sausage
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Dinner
                                                                    Sausage
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Chicken
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Sliced Deli
                                                                    Meat
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Wild Caught
                                                                    Fillets
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Crab and
                                                                    Shellfish
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-34">
                                                        <div className="menu-banner-wrap">
                                                            <a href="#">
                                                                <img
                                                                    src="/assets/imgs/banner/banner-menu.png"
                                                                    alt="Nest"
                                                                />
                                                            </a>
                                                            <div className="menu-banner-content">
                                                                <h4>
                                                                    Hot deals
                                                                </h4>
                                                                <h3>
                                                                    Don't miss
                                                                    <br />
                                                                    Trending
                                                                </h3>
                                                                <div className="menu-banner-price">
                                                                    <span className="new-price text-success">
                                                                        Save to
                                                                        50%
                                                                    </span>
                                                                </div>
                                                                <div className="menu-banner-btn">
                                                                    <a href="#">
                                                                        Shop now
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="menu-banner-discount">
                                                                <h3>
                                                                    <span>
                                                                        25%
                                                                    </span>
                                                                    off
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/blog-category-grid">
                                                    <a>
                                                        Blog
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/blog-category-grid">
                                                            <a>
                                                                Blog Category
                                                                Grid
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-list">
                                                            <a>
                                                                Blog Category
                                                                List
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-big">
                                                            <a>
                                                                Blog Category
                                                                Big
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-fullwidth">
                                                            <a>
                                                                Blog Category
                                                                Wide
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#">
                                                            <a>
                                                                Single Post
                                                                <i className="fi-rs-angle-right"></i>
                                                            </a>
                                                        </Link>
                                                        <ul className="level-menu level-menu-modify">
                                                            <li>
                                                                <Link href="/blog-post-left">
                                                                    <a>
                                                                        Left
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/blog-post-right">
                                                                    <a>
                                                                        Right
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/blog-post-fullwidth">
                                                                    <a>
                                                                        No
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/#">
                                                    <a>
                                                        Pages
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/page-about">
                                                            <a>About Us</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-contact">
                                                            <a>Contact</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-account">
                                                            <a>My Account</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-login-register">
                                                            <a>
                                                                login/register
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-purchase-guide">
                                                            <a>
                                                                Purchase Guide
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-privacy-policy">
                                                            <a>
                                                                Privacy Policy
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-terms">
                                                            <a>
                                                                Terms of Service
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-404">
                                                            <a>404 Page</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/page-contact">
                                                    <a>Contact</a>
                                                </Link>
                                            </li>  */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
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
