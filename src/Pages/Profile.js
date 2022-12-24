import React from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { fetchUserInfo, followUser, unFollowUser } from "../features/user/userSlice";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { RecentlyJoinedUsers } from '../components/HomePageComponents/RecentlyJoinedUsers';
import Spinner from "../components/Spinner";

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