import React, { useEffect } from 'react'
import Spinner from "../Spinner";
import { useLocation, useParams } from "react-router-dom";
import { fetchMessages, newMessage } from "../../features/message/messageSlice";
import Header from "./Header";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../SocketContext/socketContext';

const Chats = () => {
  const { state: recipient } = useLocation();
  const { _id: userId } = useSelector((state) => state.user.data);
  const { messages, loadingMessages } = useSelector((state) => state.message);
  const { id } = useParams();
  const socket = useSocket();
  const dispatch = useDispatch();

  const socketNewMessageCallback = (info) => {
    dispatch(newMessage(info));
  } 

  useEffect(() => {
    dispatch(fetchMessages({ userId, receiverId: recipient._id }));

    socket.on("message", socketNewMessageCallback);

    return () => {
      socket.off("message", socketNewMessageCallback);
    };
  }, [id]);

  return (
    <div className="fixed flex flex-col bg-white lg:static border w-full md:w-17/20 lg:max-w-xl">
      {
        loadingMessages ? (
          <div className="flex justify-center mt-2 ">
            <Spinner/>
          </div>
        ) : (
          <div className="pt-4 px-2 h-full overflow-auto">
            {messages.map((msg) => {
              return <Message key={msg.messageId} msg={msg} />;
            })}
          </div>
        )}
      <SendMessageForm recipient={recipient} />
    </div>
  );
};

export default Chats