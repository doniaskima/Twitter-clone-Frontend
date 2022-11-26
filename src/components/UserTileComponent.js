import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {followUser,unFollowUser}  from "../features/user/userSlice.js"

const UserTileComponent = ({ user }) => {
    const navigate = useNavigate();
    const [isFollowedByClient, setIsFollowedByClient] = useState(user.isFollowedByClient);
    const dispatch = useDispatch();
    const { _id: clientId } = useSelector((state) => state.user.data);
    const isClientTile = user._id === clientId;
    
    const handleClick = () => {
        setIsFollowedByClient((state) => !state);
        if (isFollowedByClient) {
            dispatch(unFollowUser({ targetId: user._id }));
        } else {
            dispatch(followUser({ targetId: user._id }));
        }
    }
    
  return (
      <div
          key={user._id} 
          className="user-tile-style py-2 px-3"
          onClick={()=>navigate(`/profile/${user._id}`)}
      >
          <img
              src={user.profileUrl}
              alt={user.name}
              loading="lazy"
              className="w-10 h-10 mr-2 rounded-full"
          />
          <div className="text-left">
              <p>{user.name}</p>
              <p>@{user.username}</p>
          </div>
          {isClientTile && (
              <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className={
                isFollowedByClient ? "rounded-full py-2 px-4 text-black font-semibold text-sm ml-auto bg-white border" : "rounded-full py-2 px-4 text-white font-semibold text-sm ml-auto bg-black"
              }
              >
                  {isFollowedByClient ? "Following" : "Follow"}
              </button>
          )}
          
  </div>
  )
}

export default UserTileComponent