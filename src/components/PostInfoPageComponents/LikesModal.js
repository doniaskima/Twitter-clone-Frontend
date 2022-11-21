import { useEffect } from "react";
import { useDispatch, useSelector } from "redux";
import { fetchPostLikes } from "../../features/post/postSlice";
import { GrClose } from "react-icons/gr";

export const LikesModal = ({ postId, setShowModal }) => {
    const { likes, loadingLikes, errMessage } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPostLikes({ postId }));
    }, []);
  return (
      <div
          aria-modal="true"
          aria-label="Likes"
          role="dialog"
          className="absolute h-screen w-full flex justify-center items-center bg-black to-0 bg-opacity-50"
          onClick={() =>setShowModal(false)}
      >                                
       
          
    </div>
  )
}

export default LikesModal