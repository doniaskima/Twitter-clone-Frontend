import { useRef, useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { commentPost } from "../../features/post/postSlice.js";


export const NewComment = ({ userId, postId }) => {
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");
  const color = comment.length > 350 ? { color: "red" } : { color: "white" };
  const disableBtn = comment === "" || comment.length > 100;
  const [showCommentLengthChip, setShowCommentLengthChip] = useState(false);
  const dispatch = useDispatch();
  const { name, profileUrl } = useSelector((state) => state.user.data);

  const commentHandler = (e) => {
    e.preventDefault();
    setComment("");
    dispatch(commentPost({ userId, postId, comment: comment }));
    setShowCommentLengthChip(false);
  };

  return (
    <div className="border p-2 flex justify-between">
      <img
        src={profileUrl}
        alt={name}
        loading="lazy"
        className="w-10 h-10 mr-2 rounded-full"
      />
      <form onSubmit={commentHandler} className="w-11/12">
        <textarea
          value={comment}
          ref={textareaRef}
          onFocus={() => setShowCommentLengthChip(true)}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 focus:outline-none w-full rounded-sm resize-none"
          style={{
            height: `${textareaRef?.current?.scrollHeight}px`,
          }}
          placeholder="Your comment"
          name="comment"
          id="comment-input-field"
          aria-label="comment input field"
        ></textarea>
        <div className="flex justify-between w-full">
          <div>
            {showCommentLengthChip && (
              <span className="bg-blue-400 rounded-full py-1 px-2 text-white">
                <span style={color}>{comment.length}</span>
                {" / 100"}
              </span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-md" disabled={disableBtn}>
            comment
          </button>
        </div>
      </form>
    </div>
  );
};
