import React from "react";
//import testimonialcss from "/public/assets/css/testimonial.module.css"


const Testimonials = () => {
	
return(	 
	
<div className="container-xl">
	<div className="row">
		<div className="col-sm-12">
			<h2 className="h2Mod">TESTIMONIALS</h2>
			<div id="myCarousel" className="carousel slide" data-ride="carousel">

				
				<div className="carousel-inner">  
					<div className="carouselitem active">
						<div className="row">
							<div className="col-sm-6 border">
								<div className="media">
									<img src="/assets/imgs/testimonials/vaidehi.png" className="mr-3" alt=""/>
									<div className="media-body">   
										<div className="testimonial">
											<p>Lorem ipsum dolor sit amet, consec adipiscing elit. Nam eusem scelerisque tempor, varius quam luctus dui. Mauris magna metus nec.</p>
											<p className="overview"><b>Paula Wilson</b>, Media Analyst</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6 border">
								<div className="media">
									<img src="/assets/imgs/testimonials/vandana-bhutda.png" className="mr-3" alt=""/>
									<div className="media-body"> 
										<div className="testimonial">
											<p>Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget mi suscipit tincidunt. Utmtc tempus dictum. Pellentesque virra.</p>
											<p className="overview"><b className="testimonialname">Antonio Moreno</b>, Web Developer</p>
										</div>
									</div>
								</div>
							</div>   
														
						</div>			
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	

)
} 

export default Testimonials;