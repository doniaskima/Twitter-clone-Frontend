import React from 'react';
import { useState } from "react";
import { updateUserInfo } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const EditProfileModal = () => {
    const dispatch = useDispatch();
    const openWidget = (e) => {
        e.preventDefault();
        window.cloudinary.createUploadWidget(
            {
                cloudName: "dhnq0fsnc",
                uploadPreset: "ootyjlxj",
            }, (error, result) => {
                if (result.info?.secure_url) {
                    console.log(result.info.secure_url);
                    setProfileUrl(result.info.secure_url);
                }
            }
        )
            .open();
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserInfo({
                name:
                Bio:,
                profileUrl:
            })
        )
    }
  return (
    <div>EditProfileModal</div>
  )
}

export default EditProfileModal