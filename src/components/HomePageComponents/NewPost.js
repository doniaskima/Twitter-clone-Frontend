import { createPost } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState,useRef } from "react";


const NewPost = () => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [showContentLengthChip, setShowContentLengthChip] = useState(false);
    const color = content.length > 350 ? { color: "red" } : { color: "white" };
    const disableBtn = content === "" || content.length > 350;
    const textareaRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault(); 
        setContent("");
        dispatch(createPost({ author: user._id, content: content }));
    }

  return (
      <div className="py-2 px-2 border">
          <form onSubmit={submitHandler}>
              <div className="flex">
                  <div className="w-12 h-10 mr-3 rounded-full bg-gray-400">
                      <div className="w-full">
                          <textarea value={content} ref={textareaRef} onFocus={() => setShowContentLengthChip(true)} onChange={(e) => setContent(e.target.value)}
                            className="p-2 focus:outline-none rounded-sm resize:none"
                            style={{height:`${textareaRef?.current?.scrollHeight}px`}}
                            placeholder="What's Happening?"
                            name="content"
                            id="content-input-field"
                            aria-label="Post content"
                          ></textarea>
                          <div>
                              {showContentLengthChip && (
                                  <span className="bg-blue-400 rounded-full py-1 px-2 text-white">
                                      <span style={color}>{content.length}</span>
                                      {" / 350"}
                                  </span>
                              )}
                          </div>
                          <button type="submit" className="button" disabled={disableBtn}>
                              Tweet
                          </button>
                      </div>
                  </div>
              </div>
          
          </form>
      </div>
  )
}

export default NewPost