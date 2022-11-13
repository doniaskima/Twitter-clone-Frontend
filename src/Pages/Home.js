import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

const Home = () => {
  return (
      <div className="h-screen flex bg-white">
          <div className="flex flex-col fixed w-1/4 border-r-2 items-end h-full">
              <div className="flex flex-col justify-between h-full px-4">
                  <div className="flex flex-col">
                      <div className="">
                          <img src={Logo} className="w-40" />
                      </div>
                      <div className="mt-2 mb-4">
                          <nav aria-label="Primary" role="navigation">
                          <Link to="" aria-label="Home" role="link">
                          <div className="p-3 rounded-full hover:bg-gray-200">Home</div>
                          </Link>
                          </nav>
                      </div>
                  </div>
             </div>    
          </div>
       </div>
  )
}

export default Home