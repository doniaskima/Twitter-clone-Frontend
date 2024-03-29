import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import { fetchRecentlyJoinedUsers } from "../../features/user/userSlice";
import { UserTileComponent } from "./UserTileComponent";

export const RecentlyJoinedUsers = () => {
  const dispatch = useDispatch();

  const { recentlyJoinedUsers, recentlyJoinedUsersLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchRecentlyJoinedUsers());
  }, []);

  return (
    <aside
      aria-label="Recently joined users"
      role="complementary"
      className="rounded-3xl bg-gray-100 h-96 w-80 mt-3 bg-opacity-80"
    >
      <div className="px-5 py-3 text-lg font-semibold border-b">
        Recently Joined Users
      </div>
      <div className="overflow-y-auto h-80">
        {recentlyJoinedUsersLoading ? (
          <div className="justify-center flex mt-2">
            <Spinner />
          </div>
        ) : (
          recentlyJoinedUsers.map((user) => {
            return <UserTileComponent key={user._id} user={user} />;
          })
        )}
      </div>
    </aside>
  );
};
