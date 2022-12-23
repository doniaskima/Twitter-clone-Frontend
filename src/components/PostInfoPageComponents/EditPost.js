import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../features/post/postSlice";

export const EditPost = ({ post, setShowEditPost }) => {
  const textareaRef = useRef(null);
  const [content, setContent] = useState(post.content);
  const color = content.length > 350 ? { color: "red" } : { color: "white" };
  const disableBtn =
    content === "" || content.length > 350 || content === post.content;

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost({ postId: post._id, content: content }));
    setShowEditPost(false);
  };

  return (
    <form onSubmit={updateHandler}>
      <textarea
        value={content}
        ref={textareaRef}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 focus:outline-none w-full rounded-sm resize-none"
        style={{
          height: `${textareaRef?.current?.scrollHeight}px`,
        }}
        name="content"
        id="content-input-field"
        aria-label="Edit post input field"
      ></textarea>
      <div className="flex justify-between w-full">
        <div>
          <span className="bg-blue-400 rounded-full py-1 px-2 text-white">
            <span style={color}>{content.length}</span>
            {" / 350"}
          </span>
        </div>
        <div className="space-x-2">
          <button
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-md text-base "
            onClick={() => setShowEditPost(false)}
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-md text-base "
            disabled={disableBtn}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};