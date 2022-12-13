
import React from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";

const Messages = () => {
  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <span className="font-semibold" role="heading">
        Messages
        </span>
      </div>
   </div>
  )
}

export default Messages