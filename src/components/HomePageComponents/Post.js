import dayjs from "dayjs";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, unlikePost } from "../../features/post/postSlice";
dayjs.extend(window.dayjs_plugin_relativeTime);

 const Post = ({ post }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data._id);
  
    const likeHandler = (e, isLikedByUser) => {
      e.stopPropagation();
      isLikedByUser
        ? dispatch(unlikePost({ userId, postId: post._id }))
        : dispatch(likePost({ userId, postId: post._id }));
    };
  
    return (
      <div
        className="p-2 w-full flex border cursor-pointer hover:bg-gray-50"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        <div
          className="w-10 h-10 rounded-full bg-gray-200"
          onClick={(e) => e.stopPropagation()}
        ></div>
        <div className="ml-2 w-full">
          <div className="leading-tight" onClick={(e) => e.stopPropagation()}>
            <span className="font-semibold">{post.authorName}</span>
            <span className="text-gray-400 text-sm float-right">{`${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </div>
          <span className="text-gray-400">{`@${post.authorUsername}`}</span>
          <div className="py-5">{post.content}</div>
          <div className="flex space-x-4 items-center">
            <span>
              <i>
                <FaRegComment className="inline mr-1" />
              </i>
              {post.comments.length}
            </span>
            <span onClick={(e) => likeHandler(e, post.isLikedByUser)}>
              <i>
                {post.isLikedByUser ? (
                  <FaHeart className="text-pink-600 inline mr-1" />
                ) : (
                  <FaRegHeart className="inline mr-1" />
                )}
              </i>
              {post.likes.length}
            </span>
          </div>
        </div>
      </div>
    );
}
  

export default Post;