import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"

SwiperCore.use([Navigation, Pagination]);

const HomepageBannersTop = () => {
    return (
<>
		
<section className="home-slider position-relative mb-30">
    <div className="container">
        <div className="home-slide-cover mt-30">	{/* position-relative */}	

		
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={false}
                pagination={true}
				
                navigation={{
                    prevEl: ".custom_prev_i1",
                    nextEl: ".custom_next_i1",
                }}
                className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1"     
            >
                <SwiperSlide>
					<Link href="#">
						<a>
							<div
								className="single-hero-slider single-animation-wrap"
								  
							>
							 <img src="/assets/imgs/slider/slider-1.jpg"/>   
							</div>
						</a>
					</Link>
                </SwiperSlide>
                <SwiperSlide>
					<Link href="#">
						<a>
							<div
								className="single-hero-slider single-animation-wrap"
							>
							<img src="/assets/imgs/slider/slider-2.jpg"/> 
							</div>
						</a>
					</Link>
                </SwiperSlide>
				
				<SwiperSlide>
					<Link href="#">
						<a>
							<div
								className="single-hero-slider single-animation-wrap"
							>
							<img src="/assets/imgs/slider/slider-3.jpg"/> 
							</div>
						</a>
					</Link>
                </SwiperSlide>								
            </Swiper>
			
			 <div className="slider-arrow ">         {/*  left: 0 */}
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
				  <i className="fi-rs-angle-left"></i>  
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
				  <i className="fi-rs-angle-right"></i> 
                </span> 
			</div>   
			
		</div>
    </div>
</section>

</>
    );
};

export default HomepageBannersTop;
