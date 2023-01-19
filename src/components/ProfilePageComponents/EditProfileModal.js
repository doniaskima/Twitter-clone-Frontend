import { useState } from "react";
import { updateUserInfo } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { GrClose } from "react-icons/gr";
import { Label, Input } from "../../components/FormComponents";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";


const EditProfileModal = ({ setShowProfileModal, user }) => {
    const [formState, setFormState] = useState({
        Name: user.name,
        Bio: user.bio,
    });
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio)
    const [profileUrl, setProfileUrl] = useState(user.profileUrl);
    const dispatch = useDispatch();

    const openWidget = (e) => {
        e.preventDefault();
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: "dhnq0fsnc",
                    uploadPreset: "doniaTwitterClone",
                    cropping: true,
                },
                (error, result) => {
                    if (result.info?.secure_url) {
                        console.log(result.info.secure_url);
                        setProfileUrl(result.info.secure_url);
                    }
                }
            )
            .open();
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserInfo({
                name: name,
                bio: bio,
                profileUrl: profileUrl,
            })
        );
        setShowProfileModal(false);
    };


    return (
        <ModalWrapper
            callback={() => setShowProfileModal(false)}
            ariaLabel="Edit Profile"
        >
            <div className="bg-white rounded-md px-4 py-2 w-96 lg:w-96" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={submitHandler}>
                    <div className="py-1 flex w-full text-lg items-center border-b">
                        <i
                            role="button"
                            aria-label="Close"
                            aria-describedby="Button to close dialog"
                        >
                            <GrClose onClick={() => setShowProfileModal(false)} />
                        </i>
                        <span className="font-semibold ml-4">Edit Profile</span>
                        <button type="submit" className=" rounded-full py-2 px-4 text-white font-semibold text-sm ml-auto bg-black">
                            Save
                        </button>
                    </div>
                    <div className="py-2 px-2 lg:px-0">
                        <div className="flex px-5 items-center ml-auto">
                            <img src={profileUrl}
                                alt={user.name}
                                loading="lazy"
                                className="w-24 h-24 rounded-full" />

                            <button
                                onClick={openWidget}
                                className="whitespace-nowrap rounded-full py-2 px-4 text-white font-semibold text-sm ml-auto bg-black">
                                Change Profile Picture
                            </button>
                        </div>
                        <div className="">
                            <Label labelText="Name" id="name-label" htmlFor="edit-name" />
                            <input
                                name="Name"
                                value={name}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setName(e.target.value);
                               }}
                                id="edit-name"
                                ariaLabelledBy="name-label"
                                className="border-2 border-gray-400 rounded-md w-full p-2 my-2 font-sans"
                            />
                            <Label labelText="Bio" id="bio-label" htmlFor="edit-bio" />
                            <input
                                name="Name"
                                value={bio}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setBio(e.target.value);
                                }}
                                id="edit-name"
                                ariaLabelledBy="name-label"
                                className="border-2 border-gray-400 rounded-md w-full p-2 my-2 font-sans"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    );
};

export default EditProfileModal;