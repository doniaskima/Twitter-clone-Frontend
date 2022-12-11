import { useEffect } from "react";
import { fetchUserFeed } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "../components/HomePageComponents/NewPost";
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import Feed from "../components/HomePageComponents/Feed";
import { Link } from "react-router-dom";
import {Post} from "../components/HomePageComponents/Post"
import {RecentlyJoinedUsers} from "../components/HomePageComponents/RecentlyJoinedUsers";

export const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  
  useEffect(() => {
    dispatch(fetchUserFeed(userId));
  }, []);


  return (
    <div className="flex h-screen bg-white">
    <SideNavigationBar />
    <div className="w-600 border">
      <div className="fixed w-600 h-10 bg-white flex items-center p-2 border-b-0">
        <span className="font-semibold" role="heading">
          Home
        </span>
      </div>
      <div className="mt-10 w-full">
        <NewPost />
        {/* <Feed /> */}
      </div>
    </div>
    <div className="ml-5">
      <RecentlyJoinedUsers />
    </div>
  </div>
  )
}

 