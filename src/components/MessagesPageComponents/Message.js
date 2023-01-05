import React from 'react'
import {useDispatch ,useSelector} from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { deleteMessage } from "../../features/message/messageSlice";

const Message = () => {
  const { _id: id } = useSelector((state) => state.user.data);
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
  const dispatch = useDispatch();  
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className="flex w-full mb-4"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div>

      </div>
    </div>
  )
}

export default Message