import React, { useEffect, useState } from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { fetchUserInfo, followUser, unFollowUser } from "../features/user/userSlice";
import dayjs from "dayjs";
import { AiOutlineCalendar } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux";
import { RecentlyJoinedUsers } from '../components/HomePageComponents/RecentlyJoinedUsers';
import Spinner from "../components/Spinner";
import EditProfileModal from "../components/ProfilePageComponents/EditProfileModal";
import SwitchTabComponent from "../components/ProfilePageComponents/SwitchTabComponent";
import { useParams } from 'react-router-dom'
const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  
  const { retreivedUser, retreivedUserLoading: loading } = useSelector(
    (state) => state.user
  );  
  const loggedInUser = useSelector((state) => state.user.data);
  const isLoggedInUser = loggedInUser._id === retreivedUser._id;
  const [showProfileModal, setShowProfileModal] = useState(false);
  const isFollowedByLoggedInUser = retreivedUser.followers.some(
    (id) => loggedInUser._id === id
  );
  const joinedOn = dayjs(retreivedUser?.createdAt).format("MMMM YYYY");
   
  useEffect(() => {
    dispatch(fetchUserInfo({ userId }));
  }, [userId]);

  const handleClick = () => {
    if (isFollowedByLoggedInUser) {
      dispatch(unFollowUser({ targetId: retreivedUser._id }));
    } else {
      dispatch(followUser({ targetId: retreivedUser._id }));
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border ">
          <span className="font-semibold" role="heading">
            Profile
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        ) : (
          <div className="mt-10 w-full">
            <div className="p-2 border">
              <img
                src={retreivedUser.profileUrl}
                alt={retreivedUser.name}
                loading="lazy"
                className="w-28 h-28 mr-2 rounded-full"
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{retreivedUser.name}</p>
                  <p>{`@${retreivedUser.username}`}</p>
                </div>
                {isLoggedInUser && (
                  <button
                    className="py-2 px-3 border-2 border-black rounded-full"
                    onClick={() => setShowProfileModal(true)}
                  >
                    Edit profile
                  </button>
                )}
                {!isLoggedInUser && (
                  <button
                    onClick={handleClick}
                    className={
                      isFollowedByLoggedInUser
                        ? "rounded-full py-2 px-4 text-black font-semibold text-sm ml-auto bg-white border"
                        : "rounded-full py-2 px-4 text-white font-semibold text-sm ml-auto bg-black"
                    }
                  >
                    {isFollowedByLoggedInUser ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="py-2 text-base">{retreivedUser.bio}</div>
              <div className="flex items-center space-x-1 mt-2">
                <AiOutlineCalendar />
                <p className="text-gray-400 text-sm">{`Joined ${joinedOn}`}</p>
              </div>
              <div className="space-x-2 mt-2">
                <span>
                  <span className="font-semibold">
                      {retreivedUser.following.length}
                  </span>
                  <span className="text-gray-400"> Following</span>
                </span>
                <span>
                  <span className="font-semibold">
                    {retreivedUser.followers.length}
                  </span>
                  <span className="text-gray-400">
                    {retreivedUser.followers.length == 1
                      ? " Follower"
                      : " Followers"}
                  </span>
                </span>
              </div>
            </div>
            <SwitchTabComponent userId={userId} />
          </div>
        )}
      </div>
      <div className="ml-8 hidden lg:block">
        <RecentlyJoinedUsers />
      </div>
      {showProfileModal && (
        <EditProfileModal
          setShowProfileModal={setShowProfileModal}
          user={retreivedUser}
        />
      )}
    </div>
  );
};

export default Profile;


