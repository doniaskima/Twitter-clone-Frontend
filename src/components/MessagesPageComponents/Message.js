import React from 'react'
import {useDispatch ,useSelector} from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";

const Message = () => {
  const { _id: id } = useSelector((state) => state.user.data);
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
  const dispatch = useDispatch();
  
  return (
    <div
      className="flex w-full mb-4"
    >
      <div>
        
      </div>
    </div>
  )
}

export default Message