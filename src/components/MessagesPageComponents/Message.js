import React from 'react'
import {useDispatch ,useSelector} from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { deleteMessage } from "../../features/message/messageSlice";
import { decryptMessage, copyToClipboard } from '../../utils/BaseUrl';
import { FaRegCopy } from "react-icons/fa";

const Message = ({msg}) => {
  const { _id: id } = useSelector((state) => state.user.data);
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
  const dispatch = useDispatch();  
  const messageByUser = msg.sender._id === id;
  const decryptedMessage = decryptMessage(msg.key, msg.message, msg.iv);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="flex w-full mb-4"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div
        className={`mb-3 whitespace-nowrap py-2 px-3 relative` ${messageByUser} ? "ml-auto bg-blue-400 text-white rounded-br-none rounded-3xl" : "mr-auto rounded-bl-none rounded-3xl bg-slate"}
      >
      {decryptedMessage}
      <p className="text-black right-0 text-xs ">
        {timestamp}
      </p>
      {
        showOptions && 
        <div>
            <i
              role="button"
              aria-label="Copy message"
              className="text-gray-600 text-lg"
              onClick={() => copyToClipboard(decryptedMessage)}
            >
              <FaRegCopy />
            </i>
          </div>
      }
    </div>
    
    </div>
  )
}

export default Message