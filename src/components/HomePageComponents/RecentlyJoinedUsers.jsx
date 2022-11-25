import {useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import { fetchRecentlyJoinedUsers, followUser } from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";

export const RecentlyJoinedUsers = () => {
    const disptach = useDispatch();
    const navigate = useNavigate();
    const { recentlyJoinedUsers, recentlyJoinedUsersLoading } = useSelector(
        (state) => state.user
      );
    const [buttonStateArray, setButtonStateArray] = useState([]);
    const handleClick = ((id, index) => {
        setButtonStateArray(
            buttonStateArray.map((i, idx) => (idx === index ? !i : i))
        );
        dispatch(followUser({ targetId: id }));
    });
    console.log(buttonStateArray);
    // useEffect(() => {
    //     dispatch(fetchRecentlyJoinedUsers());
    //      
        
    // },[])
  return (
      <aside
          aria-label="Recently joined users"
          role="complementary"
          className="rounded-3xl bg-gray h-96 w-80 mt-10 fixed bg-opacity-80"
      >
          <div className="px-5 py-3 text-lg font-semibold border-b">
              Recently joined Users
          </div>

          {recentlyJoinedUsersLoading ? (
              <div className="justify-center flex mt-2">
                  <Spinner/>
              </div>
          ) : (
            recentlyJoinedUsers.map((user,index)=>{
                return (
                    <div
                        key={user._id}
                        className="flex py-2 px-3 items-start cursor-pointer"
                        onClick={()=> navigate(`/profile/${user._id}`)}
                    >
                        <img
                            src={user.profileUrl}
                            alt={user.name}
                            loading="lazy"
                            className="w-10 h-10 mr-2"
                        />
                        <div>
                            <p className="leading-4 font-medium">{user.name}</p>
                            <p className="leading-4  text-gray-400">@{user}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick(user._id, index);
                            }}
                            
                            className={
                                buttonStateArray[index] ? "rounded-full py-2 px-4 text-black font-semibold text-sm ml-auto bg-white border"
                                    : "rounded-full py-2 px-4 text-white font-semibold text-sm ml-auto bg-black"
                            }
                        >
                             {buttonStateArray[index] ? "Following" : "Follow"}
                        </button>
                    </div>
                )
            })
           )}
          
    </aside>
  )
}
