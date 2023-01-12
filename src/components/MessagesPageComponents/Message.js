import React from 'react'
import {useDispatch ,useSelector} from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { deleteMessage } from "../../features/message/messageSlice";
import { decryptMessage, copyToClipboard } from '../../utils/BaseUrl';
import { FaRegCopy, FaRegTrashAlt } from "react-icons/fa";

const Message = ({ msg }) => {
  const dispatch = useDispatch();  
  const { _id: id } = useSelector((state) => state.user.data);
  const timestamp = dayjs(msg.createdAt).format("MMM D, YYYY, h:mm a");
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
        className={`mb-3 whitespace-nowrap py-2 px-3 relative ${messageByUser ? "ml-auto bg-blue-400 text-white rounded-br-none rounded-3xl" : "mr-auto rounded-bl-none rounded-3xl bg-slate"
          }`}
      >
        {decryptedMessage}
        <p className="absolute text-black -bottom-5 right-0 text-xs">
          {timestamp}
        </p>
        {showOptions && (
          <div
            aria-label="Message options"
            className={`absolute bottom-1 flex border space-x-3 ${messageByUser ? "-left-14" : "-right-14"
              }`}
          >
            <i
              role="button"
              aria-label="Copy message"
              className="text-gray-600 text-lg"
              onClick={() => copyToClipboard(decryptedMessage)}
            >
              <FaRegCopy />
            </i>
            <i
              role="button"
              aria-label="Delete Message"
              className="text-red-700 text-lg"
              onClick={() =>
                dispatch(deleteMessage({ messageId: msg.messageId }))
              }
            >
              <FaRegTrashAlt />
            </i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
 