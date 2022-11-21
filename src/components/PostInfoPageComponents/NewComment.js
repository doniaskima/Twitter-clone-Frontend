import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../features/post/postSlice.js";


export const NewComment = ({ userId, postId }) => {
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");
  const color = comment.length > 350 ? { color: "red" } : { color: "white" };
  const disableBtn = comment === "" || comment.length > 100;
  const [showCommentLengthChip, setShowCommentLengthChip] = useState(false);
   const dispatch = useDispatch();
   
  const commentHandler = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(commentPost({ userId, postId, comment: comment }));
    setShowCommentLengthChip(false);
  }
  return (
    <div className="border p-2 flex justify-between">
      <div className="w-10 h-10 rounded-full bg-gray-200">
        <form onSubmit={commentHandler} className="w-11/12">
          <textarea
            value={comment} 
            ref={textareaRef}
            onFocus={() => setShowCommentLengthChip(true)}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 focus:outline-none w-full rounded-sm resize-nonde"
            placeholder="Your comment"
            name="comment" 
            id="comment input field"
            style={{
            height: `${textareaRef?.current?.scrollHeight}px`,
            }}
            aria-label="comment input field"
          ></textarea>
          <div className="flex justify-between w-full">
            <span className="bg-blue-400 rounded-full py-1 px-2 text-white">
              <span style={color}>
                {comment.length}
              </span>
            </span>
          </div>
          <button type="submit" className="button" disable={disableBtn}>
            comment
          </button>
        </form>
      </div>
   </div>
  )
}

