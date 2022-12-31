
import { useState } from "react";
import { updateUserInfo } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { GrClose } from "react-icons/gr";
import { Label, Input } from "../../components/FormComponents";
const EditProfileModal = ({ setShowProfileModal, user }) => {
    const [formState, setFormState] = useState({
        Name: user.name,
        Bio: user.bio,
    });
    const [profileUrl, setProfileUrl] = useState(user.profileUrl);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserInfo({
                name: formState["Name"],
                Bio: formState["Bio"],
                profileUrl: profileUrl,
            })
        );
        setShowProfileModal(false);
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormState({...formState, [name]: value });
    };

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

    return ( 
        <ModalWrapper
            callback={() => setShowProfileModal(false)}
            ariaLabel="Edit Profile"
        >
            <div className="bg-white rounded-md px-4 py-2 w-96 lg:w-96">
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
                            <Input
                                name="Name"
                                value={formState["Name"]}
                                callback={changeHandler}
                                id="edit-name"
                                ariaLabelledBy="name-label"
                            />
                            <Label labelText="Bio" id="bio-label" htmlFor="edit-bio" />
                            <Input
                                name="Bio"
                                value={formState["Bio"]}
                                callback={changeHandler}
                                id="edit-bio"
                                ariaLabelledBy="bio-label"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    );
};

export default EditProfileModal;