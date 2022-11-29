import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComment, FaHeart,FaRegUser } from "react-icons/fa";
import { fetchNotifications } from "../features/notification/notificationsSlice"
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar"

const Notification = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const { loading, errMessage, notifications } = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(fetchNotifications({ userId }));
  }, []);
  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" >
            Notifications
          </span>
        </div>
        <div className="mt-10 w-full">
          {loading ? (
            <div className="justify-center flex mt-14">
              <Spinner/>
            </div>
          ) : (
              notifications.map((notification) => {
                return (
                  <div className="border py-5 px-3">
                    <p>
                      <li>
                      {notification.type === "LIKED" ? (
                        <FaHeart className="text-pink-400 inline mr-3" />
                      ) : notification.type === "NEW_COMMENT" ? (
                        <FaRegComment className="inline mr-3" />
                      ) : (
                        <FaRegUser className="inline mr-3" />
                      )}
                    </i>
                      </li>
                      <Link to={`/profile/${notification.sourceId}`}>
                      <span className="font-semibold mr-1">
                        {notification.sourceName}
                      </span>
                      </Link>

                      <span>
                        {notification.type==="LIKED" ?"liked your post"                        : notification.type === "NEW_COMMENT"
                        ? "commented on your post"
                        : "followed you"}
                      </span>
                    </p>
                  </div>
                )
              })
          )}
          {!loading && errMessage && (
            <div className="text-center font-medium mt-4">
              {errMessage}
            </div>
          )}
          {!loading && notifications.length === 0 && (
            <div className="text-center font-medium mt-12">
              No Notifications
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification