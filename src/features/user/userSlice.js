import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";



export const loginUserAsync = createAsyncThunk(
    "user/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/login`, { email, password, });
            if (data.success) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithError({
                errorMessage: error.message
            });
        }
    }
);


export const signupUserAsync = createAsyncThunk(
    "user/signup",
    async ({ username, name, email, password }, thunkAPI) => {
        try {
            const { data } = await axios.post(`${BaseUrl}/users/signup`, {
                username, name, email, password,
            });
            if (data.success) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)


export const fetchUserFollowers = createAsyncThunk(
    "user/fetchUserFollowers",
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/followers/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            });
        } catch (error) {
            return thunkAPI.rejectWithValue({
                errorMessage: error.message
            })
        }
    }
)

export const fetchUserFollowing = createAsyncThunk(
    "user/fetchUserFollowing",
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/following/${userId}`);
            if (data.success) {
                return data;
            }
            return thunkAPI.rejectWithValue({
                errorMessage: data.message
            })
        } catch (error) {
            return thunkAPI.rejectWithValue({ errorMessage: error.message });
        }
    }
)


export const fetchUserInfo = createAsyncThunk(
    "user/fetchUserInfo",
    async ({ userId }, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/${userId}`);
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

export const followUser = createAsyncThunk(
    "user/followUser",
    async ({ targetId }, thunkAPI) => {
        try {
            
        }
    }
)

export default userSlice.reducer;
