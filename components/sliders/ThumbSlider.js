import React, { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import Zoom from "react-img-zoom";

SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
	
	const swiperSlideImageArray = [];
	
	for (let x in product.images) {
		
		swiperSlideImageArray.push(<SwiperSlide> <img src={product.images[x].imageUrl} /> </SwiperSlide>)
	}
	
	return (
        <div>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
            >
			{ swiperSlideImageArray }
				                                                 
            </Swiper>
             <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper"
            >
            { swiperSlideImageArray }	    
            </Swiper>  
        </div>
    ); 
};

export default ThumbSlider;
