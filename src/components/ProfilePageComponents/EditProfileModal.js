import React from 'react'

const EditProfileModal = () => {

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
  return (
    <div>EditProfileModal</div>
  )
}

export default EditProfileModal