import Link from "next/link"


const CategoriesHomepage = () => {
    return (
        <>
	      <div className="slider-arrow hero-slider-1-arrow">
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                   <i className="fi-rs-angle-left"></i> 
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
                    <i className="fi-rs-angle-right"></i>
                </span> 
			</div> 

			<div className="text-center pt-40">
				<h5> HEALTHY GROCERIES RIGHT AT ONE PLACE! </h5>
			</div>
			
			
			<div>
					<div className="container pr-80 pl-80">
						<div className="row pt-20">
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/1.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/2.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/3.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/4.jpg"/>
							</div>
						</div>									

				

						<div className="row pt-0">
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/5.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/6.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/7.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/8.jpg"/>
							</div>
						</div>


						<div className="row pt-20">
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/9.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/10.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/11.jpg"/>
							</div>
							<div className="col px-2">
								<img src="/assets/imgs/category_photos/12.jpg"/>
							</div>
						</div>
					</div>
			</div>			
        </>
    );
};

export default CategoriesHomepage;
