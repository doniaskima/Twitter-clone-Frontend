import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";


export const fetchNotifications = createAsyncThunk(

    "notification/fetchNotifications",
    async ({ userId, thunkAPI }) => {
        try {
            const { data } = await axios.get(`${BaseUrl}/users/notifications/${userId}`);
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