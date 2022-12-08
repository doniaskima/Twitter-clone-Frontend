import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMessages, newMessage } from "../../features/message/messageSlice";
import { useSocket } from "../../SocketContext/socketContext";

const chats = () => {
  return (
    <div>chats</div>
  )
}

export default chats