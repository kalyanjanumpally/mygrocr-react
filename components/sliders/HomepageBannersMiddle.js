import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"

SwiperCore.use([Navigation, Pagination]);

const HomepageBannersMiddle = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
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
								style={{
									backgroundImage:
										"url(assets/imgs/banners-middle/1.jpg)",
								}}
							>
							</div>
						</a>
					</Link>
                </SwiperSlide>
                <SwiperSlide>
					<Link href="#">
						<a>
							<div
								className="single-hero-slider single-animation-wrap"
								style={{
									backgroundImage:
										"url(assets/imgs/banners-middle/2.jpg)",
								}}
							>
							</div>
						</a>
					</Link>
                </SwiperSlide>
				
				<SwiperSlide>
					<Link href="#">
						<a>
							<div
								className="single-hero-slider single-animation-wrap"
								style={{
									backgroundImage:
										"url(assets/imgs/banners-middle/3.jpg)",
								}}
							>
							</div>
						</a>
					</Link>
                </SwiperSlide>
				
				
				
				
				
				
				
				
				
				
            </Swiper>

	      <div className="slider-arrow hero-slider-1-arrow">
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                   <i className="fi-rs-angle-left"></i> 
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
                    <i className="fi-rs-angle-right"></i>
                </span> 
			</div> 		
        </>
    );
};

export default HomepageBannersMiddle;
