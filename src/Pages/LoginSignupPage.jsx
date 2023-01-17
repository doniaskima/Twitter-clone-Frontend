import React from 'react'
import Pattern from "../assets/pattern.png";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LoginSignupPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen ">
            <div className="lg:grid-cols-2 md:grid-rows-reverse-2   gap-4 grid relative bg-white">
                <div className="h-max flex justify-center bg-white">
                    <img src={Pattern} alt="pattern-img" className="w-max lg:h-full h-fit object-contain object-cover" />
                    <svg viewBox="0 0 24 24" aria-hidden="true"
                        className="r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr absolute fill-white mt-16 lg:w-64 lg:h-64 lg:-top-8 flex justify-center lg:mt-40 h-40 w-40">
                        <g>
                            <path
                                d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div className="flex lg:flex-col md:flex-row-reverse">
                    <div className="">
                        <img src={Logo} alt="cute twitter" className="w-24 w-36  lg:mt-12 lg:ml-8  " />
                    </div>
                    <div className="flex justify-center flex-col">
                        <h1 className="font-semibold lg:text-7xl text-3xl  lg:ml-12 mt-4">Happening now</h1>
                        <h2 className="font-medium lg:text-4xl text-xl lg:ml-12 mt-7">Join Twitter today.</h2>
                        <div className="flex flex-col lg:gap-8 gap-4 justify-center lg:ml-24 mt-8">
                            <div>
                                <button
                                    onClick={() => navigate("/signup")}
                                    type="submit" className="bg-blue-500 text-white font-semibold lg:px-24 lg:py-4 px-16 py-4 rounded-full shadow-md" >
                                    Sign up
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate("/Login")}
                                    type="submit" className="bg-blue-500 text-white font-semibold lg:px-24 lg:py-4 px-16 py-4 rounded-full shadow-md  " >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="left-0 right-0 bottom-0 text-center fixed mb-1">
                <Footer />
            </div>

        </div>
    )
}

export default LoginSignupPage