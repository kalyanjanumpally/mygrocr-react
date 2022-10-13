import React from "react";
import Link from "next/link"
const BlogOnHomepage = () => {
    return (
        <>
		
			<div className="text-center pt-40">
					<h2> BLOGS </h2>
			</div>	
		
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/1.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/2.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
			
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/3.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
			
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/4.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
			
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/5.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
			
            <div className="col-lg-4 col-md-6">
                <div className="banner-img">	
					<Link href="/">
						<a>
							<img src="/assets/imgs/blog-homepage/6.jpg" alt="" />                              
						</a>
					</Link>
                </div>
            </div>
            
        </>
    );
};

export default BlogOnHomepage;