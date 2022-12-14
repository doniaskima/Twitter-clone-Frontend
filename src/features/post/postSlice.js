import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchUserFeed = createAsyncThunk(
    "post/fetchFeed",
    async({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/feed/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const fetchUserPosts = createAsyncThunk(
    "post/fetchUserPosts",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.post(
                `${BaseUrl}/users/get-user-posts`,
                body
            );
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const createPost = createAsyncThunk(
    "post/createPost",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/posts/new`, body);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.put(`${BaseUrl}/posts/update-post`, body);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const likePost = createAsyncThunk(
    "post/likePost",
    async({ body, isPostFromFeed }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/posts/like`, body);
            if (data.success) {
                return {...data, isPostFromFeed };
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const commentPost = createAsyncThunk(
    "post/commentPost",
    async(body, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/posts/comment`, body);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const deleteComment = createAsyncThunk(
    "post/deleteComment",
    async({ commentId }, thunkAPI) => {
        try {
            const { data } = await axios.delete(
                `${BaseUrl}/posts/comment/${commentId}`
            );
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const unlikePost = createAsyncThunk(
    "post/unlikePost",
    async({ body, isPostFromFeed }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/posts/unlike`, body);
            if (data.success) {
                return {...data, isPostFromFeed };
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async({ postId }, thunkAPI) => {
        try {
            const { data } = await axios.delete(`${BaseUrl}/posts/delete/${postId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const fetchPostLikes = createAsyncThunk(
    "post/fetchPostLikes",
    async({ postId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/posts/likes/${postId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const fetchPostComments = createAsyncThunk(
    "post/fetchPostComments",
    async({ postId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/posts/comments/${postId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

export const fetchSinglePost = createAsyncThunk(
    "post/fetchSinglePost",
    async({ postId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/posts/${postId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState: {
        feed: [],
        post: null,
        userPosts: [],
        likes: [],
        comments: [],
        loading: false,
        loadingLikes: false,
        loadingComments: false,
        errMessage: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUserFeed.fulfilled]: (state, action) => {
            state.feed = action.payload.feed;
            state.loading = false;
        },
        [fetchUserFeed.rejected]: (state, action) => {
            state.loading = false;
            state.errMessage = action.payload.errorMessage;
        },
        [fetchUserFeed.pending]: (state) => {
            state.loading = true;
        },
        [fetchUserPosts.pending]: (state) => {
            state.loading = true;
        },
        [fetchUserPosts.rejected]: (state, action) => {
            state.loading = false;
            state.errMessage = action.payload.errorMessage;
        },
        [fetchUserPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.err = "";
            state.userPosts = action.payload.posts;
        },
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.errorMessage = "";
            state.userPosts.unshift(action.payload.post);
            state.feed.unshift(action.payload.post);
        },
        // [likePost.pending]: (state) => {
        //   state.loading = true;
        // },
        // [likePost.rejected]: (state, action) => {
        //   state.loading = false;
        //   state.errorMessage = action.payload.errorMessage;
        // },
        [likePost.fulfilled]: (state, action) => {
            state.errorMessage = "";
            if (action.payload.isPostFromFeed) {
                const index = state.feed.findIndex(
                    (post) => post._id === action.payload.postId
                );
                state.feed[index].likes.unshift(action.payload.likedBy.id);
                state.feed[index].isLikedByUser = true;
            } else {
                const index = state.userPosts.findIndex(
                    (post) => post._id === action.payload.postId
                );
                state.userPosts[index].likes.unshift(action.payload.likedBy.id);
                state.userPosts[index].isLikedByUser = true;
            }
        },
        [commentPost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [commentPost.fulfilled]: (state, action) => {
            state.errorMessage = "";
            state.comments.unshift(action.payload.comment);
            state.loading = false;
        },
        // [unlikePost.pending]: (state) => {
        //     state.loading = true;
        // },
        // [unlikePost.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.errorMessage = action.payload.errorMessage;
        // },
        [unlikePost.fulfilled]: (state, action) => {
            state.errorMessage = "";
            if (action.payload.isPostFromFeed) {
                const index = state.feed.findIndex(
                    (post) => post._id === action.payload.postId
                );
                const indexOfId = state.feed[index].likes.indexOf(
                    action.payload.unlikeBy
                );
                state.feed[index].likes.splice(indexOfId, 1);
                state.feed[index].isLikedByUser = false;
            } else {
                const index = state.userPosts.findIndex(
                    (post) => post._id === action.payload.postId
                );
                const indexOfId = state.userPosts[index].likes.indexOf(
                    action.payload.unlikeBy
                );
                state.userPosts[index].likes.splice(indexOfId, 1);
                state.userPosts[index].isLikedByUser = false;
            }
        },
        [deletePost.pending]: (state) => {
            state.loading = true;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.errorMessage = "";
            const index = state.feed.findIndex(
                (post) => post._id === action.payload.postId
            );
            state.feed.splice(index, 1);
            state.loading = false;
        },
        [fetchPostLikes.pending]: (state) => {
            state.loadingLikes = true;
        },
        [fetchPostLikes.rejected]: (state, action) => {
            state.loadingLikes = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchPostLikes.fulfilled]: (state, action) => {
            state.errorMessage = "";
            state.likes = action.payload.likes;
            state.loadingLikes = false;
        },
        [fetchPostComments.pending]: (state) => {
            state.loadingComments = true;
        },
        [fetchPostComments.rejected]: (state, action) => {
            state.loadingComments = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.errorMessage = "";
            state.comments = action.payload.comments;
            state.loadingComments = false;
        },
        [fetchSinglePost.pending]: (state) => {
            state.loading = true;
        },
        [fetchSinglePost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchSinglePost.fulfilled]: (state, action) => {
            state.post = action.payload.post;
            state.errMessage = "";
            state.loading = false;
        },
        [updatePost.pending]: (state) => {
            state.loading = true;
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.errMessage = action.payload.errorMessage;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.post.content = action.payload.post.content;
            state.loading = false;
            state.errMessage = "";
        },
        [deleteComment.fulfilled]: (state, action) => {
            const index = state.comments.findIndex(
                (comment) => comment._id === action.payload.commentId
            );
            state.comments.splice(index, 1);
        },
    },
});

export default postSlice.reducer;