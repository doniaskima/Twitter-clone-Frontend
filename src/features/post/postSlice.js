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
        const { data } = await axios.delete(`${BaseUrl}/posts/${postId}`);
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