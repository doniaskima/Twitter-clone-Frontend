import React from 'react'
import {useDispatch ,useSelector} from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { deleteMessage } from "../../features/message/messageSlice";
import { decryptMessage } from '../../utils/BaseUrl';

const Message = ({msg}) => {
  const { _id: id } = useSelector((state) => state.user.data);
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
  const dispatch = useDispatch();  
  const messageByUser = msg.sender._id === id;
  const decryptedMessage = decryptMessage(msg.key,msg.message,msg.iv);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className="flex w-full mb-4"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div
        className={`message-base-style` ${messageByUser} ? "message-sender-style" : "message-receiver-style"}
      >
       {decryptedMessage}
      </div>
    </div>
  )
}

export default Message