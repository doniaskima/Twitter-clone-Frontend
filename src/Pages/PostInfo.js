
import React from 'react';
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";

export const PostInfo = () => {
  const navigate = useNavigate();
  const {post,loading,errMessage}=useSelector((state)=>state.post)
  return (
    <>
      <div className="flex h-screen bg-white z-10">
        <SideNavigationBar />
        <div className="w-600 border">
          <div className="fixed w-600 h-10 bg-white  items-center space-x-6 border p-2 flex">
          <i aria-label="Back" role="button">
              <BiArrowBack className="inline" onClick={() => navigate(-1)} />
          </i>
            <span className="font-semibold">
              Post
          </span>
          </div>
          <div>
            {errMessage && (
              <div className="text-center font-meduim">
                 {errMessage}
              </div>
            )}

            {loading ? (
              <div className="flex justfiy-center">
                <Spinner/>
              </div>
            ) : (
                <div>

                </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostInfo