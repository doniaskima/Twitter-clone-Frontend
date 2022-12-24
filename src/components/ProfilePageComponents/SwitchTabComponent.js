import React from 'react'
import {useState} from "react";
import Followers from "./Followers";
import Following from "./Following";
import {UserPosts} from "./UserPosts";

const SwitchTabComponent = () => {
  const [currentTab, setCurrenTab] = useState(1);
  return (
    <>
      <div className="flex justify-evently border-b">
        <button>
          Posts
        </button>
     </div>
    
    </>
  )
}

export default SwitchTabComponent