
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import notificationReducer from "../features/notification/notificationsSlice";
import messageReducer from "../features/message/messageSlice";


export default configureStore({
    reducer: {
        post: postReducer,
        notification: notificationReducer,
        user: userReducer,
        message: messageReducer,
    }
})