import React, { useEffect, useState } from 'react'
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { fetchUserInfo, followUser, unFollowUser } from "../features/user/userSlice";
import dayjs from "dayjs";
import { AiOutlineCalendar } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux";
import { RecentlyJoinedUsers } from '../components/HomePageComponents/RecentlyJoinedUsers';
import Spinner from "../components/Spinner";
import SwitchTabComponent from "../components/ProfilePageComponents/SwitchTabComponent";
import { useParams } from 'react-router-dom'
const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { retrievedUser, retreivedUserLoading: loading } = useSelector(
    (state) => state.user
  );
  const loggedInUser = useSelector((state) => state.user.data);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo({ userId }));
  }, [userId]);

  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border ">
          <span className="font-semibold" >
            Profile
          </span>
        </div>
        {
          loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <div className='mt-10 w-full'>
              <div className='p-2 border'>
                <img src="https://avatars.githubusercontent.com/u/23558090?v=4" alt="Donia-profile" className="w-28 h-28 mr-2 rounded-full" loading="lazy" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">Donia</p>
                    <p>@Skima</p>
                    <button className="py-2 px-3 border-2 border-black rounded-full">
                      Edit profile
                    </button>
                    <div className='py-2 text-base'>bio</div>
                    <div>
                      <AiOutlineCalendar />
                      <p className='text-gray-400'>Joined December 24</p>
                    </div>
                    <div className="space-x-2 mt-2">
                      <span>
                        <span className="font-semibold">
                          233
                        </span>
                        <span className="text-gray-400"> Following</span>
                      </span>
                      <span className="font-semibold">
                        <span className="font-semibold">
                          233
                        </span>
                        <span className="text-gray-400"> Following</span>
                      </span>
                    </div>

                  </div>

                </div>

              </div>
              <SwitchTabComponent userId={userId} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Profile