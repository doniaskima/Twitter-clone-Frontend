import { createPost } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


const NewPost = () => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const [showContentLengthChip, setShowContentLengthChip] = useState(false);
    const color = content.length > 350 ? { color: "red" } : { color: "white" };
    const disableBtn = content === "" || content.length > 350;

    const submitHandler = (e) => {
        e.preventDefault(); 
        setContent("");
        dispatch(createPost({ author: user._id, content: content }));
    }
    
  return (
    <div>NewPost</div>
  )
}

export default NewPost