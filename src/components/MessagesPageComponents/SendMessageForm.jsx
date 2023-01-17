import { useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../SocketContext/socketContext";
import {BsEmojiSmile}  from "react-icons/bs";
const emojis = require("emojis-list").slice(301);

const SendMessageForm = ({ recipient }) => {
  const [text, setText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const socket = useSocket();
  const { _id, name, email, username } = useSelector(
    (state) => state.user.data
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");

    socket.emit("sendMessage", {
      sender: { _id, name, email, username },
      receiver: recipient,
      message: text,
    });
  };

  return (
    <form
      className="relative  flex mt-auto py-3 px-2 border space-x-2"
      onSubmit={handleSubmit}
    >
      <BsEmojiSmile
        onClick={() => setShowEmojis(!showEmojis)}
        className="space-x-4 font-semibold mt-1 cursor-pointer w-8 h-8 " />
  
      {showEmojis && (
        <div
          className="absolute
         bg-back flex flex-wrap left-0 -top-52 overflow-y-auto w-96 h-52"
        >
          {emojis.map((emoji, index) => {
            return (
              <div
                className="p-1 cursor-pointer"
                key={index}
                onClick={() => setText(text +" "+ emoji)}
              >
                {emoji}
              </div>
            );
          })}
        </div>
      )}
 
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Your Message"
        placeholder="Your Message"
        className="rounded-full px-2 py-1 border-2 w-full outline-none"
      />
      
      <button
        className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-md" type="submit" disabled={text === ""}>
        Send
      </button>
      
    </form>
  );
};

export default SendMessageForm;