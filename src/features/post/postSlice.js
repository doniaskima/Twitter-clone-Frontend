import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchUserFeed = createAsyncThunk(
    "post/fetchFeed",
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/feed/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.fulfillWithValue({
                errorMessage: data.message
            });
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            });
        }
    }
);

export const fetchUserPosts = createAsyncThunk(
    "post/createPost",
    async ({userId}, thunkAPI) => {
        try {
            const { data } = await axios.get(`{BaseUrl}/users/get-user-posts/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            });
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            });
        }
    }
)

export const likePost = createAsyncThunk(
    "post/like",
    async (body, thunkAPI) => {
        try {
            const { data } = await axios.post(`{BaseUrl}/post/like`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage:data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage:error.message
            })
        }
    }
)

export const unlikePost = createAsyncThunk(
    "post/unlike",
    async (body, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/posts/unlike`, body);
            if (data.success) {
              return data;
            }
            return thunkAPI.rejectWithValue({ errorMessage: data.message });
          } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
          }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async (body, thunkAPI) => {
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
  


export const commentPost = createAsyncThunk(
    "post/commentPost",
    async (body, thunkAPI) => {
        try {
            const { data } = await axios.post(`{BaseUrl}/posts/comment`, body);
        if (data.success) {
            return data;
        }
        return thunkAPI.rejectWithValue({
            errorMessage:data.message
        })
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            });
        }
         
    }
)


export const deletePost = createAsyncThunk(
    "post/deletePost",
    async ({ postId }, thunkAPI) => {
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
    async ({ postId }, thunkAPI) => {
      try {
        const { data } = await axios.get(`${BaseUrl}/post/likes/${postId}`);
        if (data.success) {
          return data;
        }
        return thunkAPI.rejectWithValue({ errorMessage: data.message });
      } catch (error) {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      }
    }
)


export const fetchPostComments = createAsyncThunk(
    "post/fetchPostComments",
    async ({ postId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`{BaseUrl}/post/comments/${postId}`);
            if (data.success) {
                return data;
            }

            return thunkAPI.rejectWithValue({
                errorMessage:data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage:error.message
            })
        }
    }

)

const postSlice = createSlice({
    name: "post",
    initialState: {
        feed: [],
        userPosts: [],
        likes: [],
        comments: [],
        loading: false,
        errMessage:null,
    },
    reducers: {},
    extraReducers: {
        [fetchUserFeed.fulfilled]: (state, action) => {
            state.feed = action.payload.feed;
            state.loading = false;
        },
        [fetchUserFeed.rejected]: (state, action) => {
            state.loading = false;
            state.errMessage = action.payload.errMessage;
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
            state.userPosts = action.payload.posts;
        },
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.errMessage = action.payload.errorMessage;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.errMessage = "";
            state.userPosts.unshift(action.payload.post);
            console.log(action.payload.post);
            state.feed.unshift(action.payload.post);
        },
        [likePost.pending]: (state) => {
            state.loading = true;
        },
        [likePost.rejected]: (state, action) => {
            state.loading = true;
        },
        [likePost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage=action.payload.errorMessage;
        },

        [likePost.fulfilled]: (state,action) => {
            state.errorMessage = "";
            const index = state.feed.findIndex(
                (post) => post._id === action.payload.postId
            );

            state.feed[index].likes.unshift(action.payload.likedBy.id);
            state.loading = false;
        },

        [commentPost.pending]: (state) => {
            state.loading = true;
        },

        [commentPost.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },

        [commentPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.errMessage = "";
            state.comments.unshift(action.payload.likedBy);
        },
        [unlikePost.pending]: (state) => {
            state.loading = true;
        },
        [unlikePost.rejected]: (state , action) => {
            state.loading = false;
            state.errMessage = action.payload.errorMessage;
        },
        [unlikePost.fulfilled]: (state, action) => {
            state.errorMessage = "";
            const index = state.feed.findIndex((post) => post._id === action.payload.postId);
            const indexOfId = state.feed[index].likes.indexOf(
                action.payload.unlikeBy
            );
            state.feed[index].likes.splice(indexOfId, 1);
            state.loading = false;
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
            const index = state.feed.findIndex((post) => post._id === action.payload.postId);
            state.feed.splice(index, 1);
            state.loading = false;
        },
        [fetchPostLikes.pending]: (state) => {
            state.loading = true;
        },
        [fetchPostLikes.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;

        },
        [fetchPostLikes.fulfilled]: (state, action) => {
            state.errorMessage = "";
            state.likes = action.payload.likes;
            state.loading = false;
        },
        [fetchPostComments.pending]: (state) => {
            state.loading = true;
        },
        [fetchPostComments.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.errorMessage;
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.errorMessage = "";
            state.comments = action.payload.comments;
            state.loading = false;
        }
    }
})

export default postSlice.reducer;