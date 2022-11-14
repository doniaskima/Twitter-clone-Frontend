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


export default userSlice.reducer;
