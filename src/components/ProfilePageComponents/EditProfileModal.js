
import { useState } from "react";
import { updateUserInfo } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { GrClose } from "react-icons/gr";

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

    return ( 
        <ModalWrapper
            callback={() => setShowProfileModal(false)}
            ariaLabel="Edit Profile"
        >
            <div className="bg-white rounded-md px-4 py-2 w-96 lg:w-96">
                <form onSubmit={submitHandler}>
                    <div className="py-1  flex w-full text-lg items-center border-b">
                        <i
                            role="button"
                            aria-label="Close"
                            aria-describedby="Button to close dialog"
                        >
                            <GrClose onClick={() => setShowProfileModal(false)} />
                        </i>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    );
};

export default EditProfileModal;