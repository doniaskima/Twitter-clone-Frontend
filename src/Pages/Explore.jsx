
import { useState } from "react";
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import SearchField from "../components/search/SearchField";
import Spinner from "../components/Spinner";
import { UserTileComponent } from "../components/HomePageComponents/UserTileComponent";
import { useSearch } from "../components/search/useSearch";

const Explore = () => {
  const [searchText, setSearchText] = useState("")
  const { loading, result } = useSearch(searchText);
  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0">
        <div className="fixed w-600 h-10 bg-white flex items-center p-2 border">
          <span className="font-semibold" role="heading">
            Explore
          </span>
        </div>
        <div className="mt-10 w-full px-5">
          <div className="pt-3">
            <SearchField
              value={searchText}
              callback={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="w-full pt-4">
            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <div>
                {result.length === 0 && (
                  <p className="text-center font-medium text-gray-500">
                    Try searching by name or username
                  </p>
                )}
                {result.map((user) => (
                  <UserTileComponent user={user} key={user._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;