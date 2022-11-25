import { useEffect } from "react";
import { fetchUserFeed } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "../components/HomePageComponents/NewPost";
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import Feed from "../components/HomePageComponents/Feed";
import { Link } from "react-router-dom";


export const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);

  useEffect(() => {
    dispatch(fetchUserFeed(userId));
  }, []);


  return (
    <div className="h-screen flex bg-white">
      <SideNavigationBar />
      <div className="w-600 border">
        <div className="fixed w-600 h-10">
          <span className="font-semibold" role="heading">Home</span>
        </div>
        <div className="mt-10 w-full">
          <NewPost />
          <Feed/>
        </div>
      </div>
    </div>
  )
}

 