
import React from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";

const Explore = () => {
  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <span className="font-semibold">
          Explore
        </span>
      </div>
   </div>
  )
}

export default Explore