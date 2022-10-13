import React, { useEffect, useState } from "react";
import "react-input-range/lib/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-responsive-modal/styles.css";
// Swiper Slider
import "swiper/css";
import "swiper/css/navigation";
import StorageWrapper from "../components/ecommerce/storage-wrapper";
import "../public/assets/css/main.css";
import store from "../redux/store";
import Preloader from "./../components/elements/Preloader";
import { SessionProvider } from "next-auth/react"
import { useSession, getSession } from "next-auth/react"
import 'react-quill/dist/quill.snow.css';



function MyApp({ Component, pageProps: {session, ...pageProps} }) {
   // const [loading, setLoading] = useState(false);
    useEffect(() => {

        if (typeof window !== "undefined") {
            window.WOW = require("wowjs");
        }
        new WOW.WOW().init();
    }, []);
    return (
        <>
		{/*       {!loading ? (                       */}
			{/*	<SessionProvider session={session} basePath="/http://localhost:8083/api/auth/session"> */}
                <Provider store={store}>
                    <StorageWrapper>
                       
                            <Component {...pageProps} />
                           <ToastContainer />     
                    </StorageWrapper>
                </Provider>
		{/*	</SessionProvider>	*/}
        {/*    ) : (
                <Preloader />
            )}                                        */}
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
}  */





export default MyApp;



