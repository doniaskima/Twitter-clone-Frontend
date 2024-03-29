import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { deleteComment } from "../../features/post/postSlice";
import dayjs from "dayjs";

export const Comments = () => {
  const { comments, commentsLoading, errMessage } = useSelector(
    (state) => state.post
  );
  const userId = useSelector((state) => state.user.data._id);
  const dispatch = useDispatch();

  return (
    <div>
      {errMessage && <div>{errMessage}</div>}
      {commentsLoading ? (
        <div className="flex justify-center mt-2">
          <Spinner />
        </div>
      ) : (
        comments.map((comment) => {
          return (
            <div key={comment._id} className="border p-2 flex justify-between">
              <img
                src={comment.commenterProfileUrl}
                alt={comment.commenterName}
                loading="lazy"
                className="w-10 h-10 mr-2 rounded-full"
              />
              <div className="ml-2 w-full">
                <div>
                  <div>
                    <span className="font-semibold">
                      {comment?.commenterName}
                    </span>
                    <div className="float-right text-gray-400">
                      <span className=" text-sm ">{`${dayjs(
                        comment.createdAt
                      ).fromNow()}`}</span>
                      {comment.commentBy === userId && (
                        <button
                          onClick={() =>
                            dispatch(deleteComment({ commentId: comment._id }))
                          }
                          className="ml-3 border-2 font-medium rounded-full px-2 py-1 hover:text-black hover:border-black"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400">{`@${comment?.commenterUsername}`}</p>
                  <div className="my-2">{comment.comment}</div>
                </div>
                <div></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};