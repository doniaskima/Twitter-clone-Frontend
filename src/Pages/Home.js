import { fetchUserFeed } from "../features/post/postSlice";
import { logoutUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Feed from "../components/HomePageComponents/Feed";
import NewPost from "../components/HomePageComponents/NewPost";
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { RecentlyJoinedUsers } from "../components/HomePageComponents/RecentlyJoinedUsers";
import SearchBox from "../components/search/SearchBox";
import { FaSignOutAlt } from "react-icons/fa";

export const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const { feed } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchUserFeed({ userId }));
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border border-b-0 ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-full md:w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Home
          </span>
          <i
            className="block md:hidden text-xl ml-auto"
            role="button"
            aria-label="Logout"
            onClick={() => dispatch(logoutUser())}
          >
            <FaSignOutAlt />
          </i>
        </div>
        <div className="mt-10 w-full">
          <NewPost />
          <Feed feed={feed} isRetrievedUserPosts={false} />
        </div>
      </div>
      <div className="ml-5 w-80 hidden lg:block">
        <SearchBox />
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
};