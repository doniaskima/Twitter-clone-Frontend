
import {useState, useEffect} from 'react';
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate , useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { NewComment, Comments, LikesModal } from "../components/PostInfoPageComponents/index";
import {
  fetchSinglePost,
  deletePost,
  fetchPostComments, } from "../features/post/postSlice";
import dayjs from "dayjs";


export const PostInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {postId} = useParams();
  const { post, loading, errMessage } = useSelector((state) => state.post);
  const likesCount = post?.likes?.length;
  const commentCount = post?.comments?.length;
  const createdAt =
  post !== null ? dayjs(post?.createdAt).format("h:mm A - MMM D, YYYY") : "";
  const user = useSelector((state) => state.user.data);
  const [showModal, setShowModal] = useState(false);
  const [shoEditPost, setShowEditPost] = useState(false);

  const deleteHandler = () => {
    dispatch(deletePost({postId:post._id}))
  }

  useEffect(() => {
  dispatch(fetchSinglePost({ postId }));
  dispatch(fetchPostComments({ postId }));
}, []);


  return (
    <>
      <div className="flex h-screen bg-white z-10">
        <SideNavigationBar />
        <div className="w-600 border">
          <div className="fixed w-600 h-10 bg-white  items-center space-x-6 border p-2 flex">
          <i aria-label="Back" role="button">
              <BiArrowBack className="inline" onClick={() => navigate(-1)} />
          </i>
            <span className="font-semibold">
              Post
          </span>
          </div>
          <div>
            {errMessage && (
              <div className="text-center font-meduim">
                 {errMessage}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center mt-16">
                <Spinner/>
              </div>
            ) : (
                <div className="mt-10 w-full border">
                  <div className="p-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200">
                    </div>
                    <div className="leading-liht">
                      <span className="font-semibold">
                           DoniaSkima
                      </span>
                      <span className="text-gray-400 text-sm float-right ">
                        <button className="small-button mr-2"
                         onClick={()=>setShowEditPost(true)}
                        >
                          Edit
                        </button>
                        <button className="small-button"
                          onClick={deleteHandler}
                          className="small-button"
                        >
                          Delete
                        </button>
                      </span>
                    </div>
                    <span className="text-gray-400">
                      “I think we’ve all been at a snapping point, where it felt like there’s no way out <br/>
                      and that the entire world is just crumbling down around you. You start questioning everything, including yourself. I have been there. And what I realized was that I had the strength to shape my reality – it just took getting out of my own way and finding inner-peace.
                    </span>
                    <div className="text-sm text-gray-400">
                    {createdAt ?? ""}
                    </div>
                  </div>
                  <div className="border-t-2 border-b-2 border-gray-100 m-4 py-2 space-x-5">
                    <span className="cursor-pointer font-semibold"
                      onClick={(e) => {
                        setShowModal(true);
                    }}
                    >
                      {likesCount}
                    </span>

                    <span className="text-gray-400 font-normal">
                      {likesCount===1 ? "like" : "likes"}
                    </span>
                    <span className="font-semibold">
                      {commentCount}
                      <span className="text-gray-400 ml-1 font-normal">
                      {commentCount === 1 ? "Comment" : "Comments"}
                      </span>
                    </span>
                  </div>
                  <NewComment userId={user?._id} post={post?._id} />
                  <Comments/>
                </div>
               
            )}
          </div>
        </div>
      </div>
      {showModal && <LikesModal postId={postId} setShowModal={setShowModal} />}
    </>
  )
}

export default PostInfo