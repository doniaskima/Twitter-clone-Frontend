import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InitialSectionCover from "../components/MessagesPageComponents/InitialSectionCover"
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { RiMailAddLine } from "react-icons/ri";
import RecipientList from "../components/MessagesPageComponents/Recipientist";
import { useLocation , Outlet } from "react-router-dom";
import NewMessageModal from "../components/MessagesPageComponents/NewMessageModal";
import Toast from "../components/Toast/Toast";
const Messages = () => {
  const user = useSelector((state) => state.user.data);
  const { pathname } = useLocation();
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  return (
    <div className="flex h-screen bg-white">
      <SideNavigationBar />
      <div className="w-600 border ml-0 md:ml-28 lg:ml-0 w-full">
        <div className="w-full lg:w-80 border">
        <div className="h-10 bg-white flex items-center p-2 border">
            <p className="font-semibold" role="heading">
              Messages
            </p>
            <i
              className="ml-auto text-xl"
              onClick={() => setShowNewMessageModal(true)}
            >
              <RiMailAddLine />
            </i>
          </div>
          <div className="w-full">
            <RecipientList />
          </div>
          {pathname === "/messages" && (
          <InitialSectionCover
            setShowNewMessageModal={setShowNewMessageModal}
          />
        )}
         <Outlet />
        </div>
        {showNewMessageModal && (
        <NewMessageModal setShowNewMessageModal={setShowNewMessageModal} />
      )}
      <Toast />
      </div>
   </div>
  )
}

export default Messages