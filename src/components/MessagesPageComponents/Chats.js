import { useEffect } from "react";
import {useDispatch,useSelctor} from "react-redux";
import {fetchMessages, newMessage} from "../../features/message/messageSlice";
import Spinner from "./Spinner";
import Header from "./Header";
import Message from "./Message";

const Chats = () => {
  return (
    <div>Chats</div>
  )
}

export default Chats