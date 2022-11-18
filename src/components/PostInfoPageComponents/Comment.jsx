import React from 'react';
import Spinner from "../Spinner";
import { deleteComment } from "../../features/post/postSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const Comment = () => {
    const { comments, commentsLoading, errMessage } = useSelector((state) => state.user.data._id);
    const userId = useSelector((state) => state.user.data._id);
    const dispatch = useDispatch();
  return (
      <div>
          {errMessage && <div>{errMessage}</div>}
          {commentsLoading ? (
        <div className="flex justify-center mt-2">
          <Spinner />
        </div>
          ): (
                  comments.map((comment) => {
                      return (
                      //add code Here Donia
                  )
              })    
          )}
  </div>
  )
}

export default Comment