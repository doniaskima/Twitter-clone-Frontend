import { BiHomeCircle, BiSearch } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import { logoutUser } from "../../features/user/userSlice";
import SideBarNavLink from "./SideBarNavLink";
import { Link } from "react-router-dom";

const SideNavigationBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  return (
    <div className="bg-white w-full md:w-auto fixed bottom-0 md:static flex md:flex-col lg:w-1/4 lg:items-end md:h-full">
      <div className="w-full md:w-auto flex md:flex-col justify-between md:h-full md:px-4 md:fixed">
        <div className="flex w-full md:w-auto md:flex-col md:mt-2 md:mr-4">
          <div className="hidden md:flex md:justify-center lg:justify-start">
            <Link to="/home">
              <img src={Logo} className="w-12" />
            </Link> 
          </div>
          <div className="w-full py-2 md:p-0 md:mt-2 md:mb-4 font-medium">
            <nav
              aria-label="Primary"
              role="navigation"
              className="flex justify-evenly md:block"
            >
              <SideBarNavLink to="/home" ariaLabel="Home" role="link">
                <BiHomeCircle className=" text-2xl" />
                <span className="hidden lg:inline">Home</span>
              </SideBarNavLink>
              <SideBarNavLink
                to="/explore"
                ariaLabel="Explore"
                role="link"
                styleClass="lg:hidden"
              >
                <BiSearch className="text-2xl" />
                <span className="hidden lg:inline">Explore</span>
              </SideBarNavLink>
              <SideBarNavLink
                to="/notifications"
                ariaLabel="Notifications"
                role="link"
              >
                <VscBell className=" text-2xl" />
                <span className="hidden lg:inline">Notifications</span>
              </SideBarNavLink>
              <SideBarNavLink to="/messages" ariaLabel="Messages" role="link">
                <HiOutlineMail className=" text-2xl" />
                <span className="hidden lg:inline">Messages</span>
              </SideBarNavLink>
              <SideBarNavLink
                to={`/profile/${user._id}`}
                ariaLabel="Profile"
                role="link"
              >
                <HiOutlineUser className=" text-2xl" />
                <span className="hidden lg:inline">Profile</span>
              </SideBarNavLink>
            </nav>
          </div>
        </div>
        <button
        className="hidden md:block  bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-md md:mb-2"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavigationBar;