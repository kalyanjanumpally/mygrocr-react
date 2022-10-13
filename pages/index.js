import FeatchTab from "../components/ecommerce/fetchTab";
import Testimonials from "../components/ecommerce/testimonials"
import Testimonialstest from "../components/ecommerce/testimonialstest"
import BlogOnHomepage from "./../components/elements/BlogOnHomepage";
import Intro1 from "./../components/sliders/Intro1";
import Layout from "./../components/layout/Layout";
import RecommendsTop from "./../components/sliders/Swap4pureRecommends";
import CarouselHomepage from "./../components/sliders/CarouselHomepage";
import HomepageBannersTop from "./../components/sliders/HomepageBannersTop";
import HomepageBannersMiddle from "./../components/sliders/HomepageBannersMiddle";
import CategoriesHomepage from "./../components/ecommerce/CategoriesHomepage";
import Link from "next/link";
// import IntroPopup from "./../components/elements/IntroPopup";

export default function Home() {
    return (
        <>
		{/*	   <IntroPopup />  */}

            <Layout noBreadcrumb="d-none">

						<HomepageBannersTop /> 
						{/* <Intro1/> */}		                     				
					
					<CategoriesHomepage/>

                <section className="popular-categories section-padding">
                    <div className="container wow animate__fadeIn animate__animated">
					{/* <div className="section-title">                   
					</div> */}
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-10-columns" id="carausel-10-columns">
                                <RecommendsTop />
                            </div>
                        </div>
                    </div>
                </section>
				
				<section className="banners mb-25">
                    <div className="container">
                        <div className="row">
							<Testimonials/>
							
                        </div>
                    </div>
                </section>
				
				<section className="home-slider position-relative mb-30">
                    <div className="container">
                        <div className="home-slide-cover mt-30">
						{/* <HomepageBannersMiddle /> 	 */}
                        </div>
                    </div>
                </section>

                <section className="banners mb-25">
                    <div className="container">
                        <div className="row">
                            <BlogOnHomepage />
                        </div>
                    </div>
                </section>
				
				<section className="popular-categories section-padding">
                    <div className="container wow animate__fadeIn animate__animated">
					{/* <div className="section-title">                   
					</div> */}
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-10-columns" id="carausel-10-columns">
                                <CarouselHomepage />
                            </div>
                        </div>
                    </div>
                </section>
				
            </Layout>
        </>
    );
}


/* export async function getStaticProps() {

    //const res = await fetch('https://.../posts')


	const result = await executeQuery({query: "SELECT * FROM products"});
	console.log(result);


    return {
        props: {}, // will be passed to the page component as props
    }
} 
 */