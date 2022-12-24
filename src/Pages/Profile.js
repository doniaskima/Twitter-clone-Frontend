import React from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
const Profile = () => {
  return (
    <div className="flex h-screen bg-white">
    <SideNavigationBar />
    <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
      <div className="fixed w-600 h-10 bg-white flex items-center p-2 border ">
        <span className="font-semibold" >
          Profile
        </span>
      </div>
      </div>
    </div>
  )
}

export default Profile