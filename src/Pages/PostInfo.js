
import {useState} from 'react';
import SideNavigationBar from "../components/SideNavigationBar/SideNavigationBar";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate , useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { NewComment, Comments, LikesModal } from "../components/PostInfoPageComponents/index";
import { deletePost } from "../features/post/postSlice";

export const PostInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {postId} = useParams();
  const { post, loading, errMessage } = useSelector((state) => state.post);
  const likesCount = post?.likes?.length;
  const commentCount = post?.comments?.length;
  const user = useSelector((state) => state.user.data);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = () => {
    dispatch(deletePost({postId:post._id}))
  }


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
              <div className="flex justfiy-center">
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
                        <button className="small-button mr-2">
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
                    {/* {createdAt ?? ""} */}
                    </div>
                  </div>
                  <div className="border-t-2 border-b-2 border-gray-100 m-4 py-2 space-x-5">
                    <span className="cursor-pointer font-semibold">
                      {/* {likesCount} */}87
                    </span>

                    <span className="text-gray-400 font-normal">
                      Likes
                    </span>

                    <span className="text-gray-400 font-normal">
                        Comments
                    </span>
                  </div>
                  <NewComment  />
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